import { useState, useRef, useCallback, useEffect } from 'react'

const VOLUME_BAR_COUNT = 7
const SILENCE_THRESHOLD = 0.8
const SILENCE_WARNING_MS = 5 * 1000

interface SilencePeriod {
  startMs: number
  endMs: number
}

export function useAudioAnalyzer(elapsedMsRef: React.MutableRefObject<number>) {
  const [volumeBars, setVolumeBars] = useState<number[]>(
    Array(VOLUME_BAR_COUNT).fill(0),
  )
  const [dbValue, setDbValue] = useState(0)
  const [silenceMs, setSilenceMs] = useState(0)

  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)
  const volumeRafRef = useRef<number | null>(null)
  const silenceRafRef = useRef<number | null>(null)
  const lastSpeechTimeRef = useRef<number>(Date.now())
  const lastVolumeUpdateRef = useRef<number>(0)
  const silencePeriodsRef = useRef<SilencePeriod[]>([])
  const silenceStartElapsedRef = useRef<number | null>(null)

  const measureVolume = useCallback(() => {
    const analyser = analyserRef.current
    if (!analyser) return

    const data = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(data)

    const max = Math.max(...data)
    const normalized = max / 255

    if (normalized > SILENCE_THRESHOLD) {
      lastSpeechTimeRef.current = Date.now()
    }

    const now = Date.now()
    if (now - lastVolumeUpdateRef.current >= 100) {
      lastVolumeUpdateRef.current = now
      const db =
        normalized > 0.001 ? Math.round(20 * Math.log10(normalized) + 60) : 0
      setDbValue(Math.max(0, db))
      setVolumeBars((prev) => [...prev.slice(1), normalized])
    }

    volumeRafRef.current = requestAnimationFrame(measureVolume)
  }, [])

  const trackSilence = useCallback(() => {
    setSilenceMs(Date.now() - lastSpeechTimeRef.current)
    silenceRafRef.current = requestAnimationFrame(trackSilence)
  }, [])

  useEffect(() => {
    let audioCtx: AudioContext | null = null

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(async (stream) => {
        audioStreamRef.current = stream
        audioCtx = new AudioContext()
        if (audioCtx.state === 'suspended') await audioCtx.resume()
        const source = audioCtx.createMediaStreamSource(stream)
        const analyser = audioCtx.createAnalyser()
        analyser.fftSize = 512
        analyser.smoothingTimeConstant = 0.8
        source.connect(analyser)
        analyserRef.current = analyser
        volumeRafRef.current = requestAnimationFrame(measureVolume)
      })
      .catch(() => {})

    return () => {
      if (volumeRafRef.current) cancelAnimationFrame(volumeRafRef.current)
      audioStreamRef.current?.getTracks().forEach((t) => t.stop())
      audioCtx?.close()
    }
  }, [measureVolume])

  useEffect(() => {
    silenceRafRef.current = requestAnimationFrame(trackSilence)
    return () => {
      if (silenceRafRef.current) cancelAnimationFrame(silenceRafRef.current)
    }
  }, [trackSilence])

  const isSilenceWarning = silenceMs >= SILENCE_WARNING_MS

  useEffect(() => {
    if (isSilenceWarning) {
      if (silenceStartElapsedRef.current === null) {
        silenceStartElapsedRef.current = Math.max(
          0,
          elapsedMsRef.current - SILENCE_WARNING_MS,
        )
      }
    } else {
      if (silenceStartElapsedRef.current !== null) {
        silencePeriodsRef.current.push({
          startMs: silenceStartElapsedRef.current,
          endMs: elapsedMsRef.current,
        })
        silenceStartElapsedRef.current = null
      }
    }
  }, [isSilenceWarning, elapsedMsRef])

  function pause() {
    if (silenceRafRef.current) cancelAnimationFrame(silenceRafRef.current)
    if (volumeRafRef.current) cancelAnimationFrame(volumeRafRef.current)
  }

  function resume() {
    lastSpeechTimeRef.current = Date.now()
    setSilenceMs(0)
    volumeRafRef.current = requestAnimationFrame(measureVolume)
    silenceRafRef.current = requestAnimationFrame(trackSilence)
  }

  return {
    volumeBars,
    dbValue,
    silenceMs,
    isSilenceWarning,
    silencePeriodsRef,
    pause,
    resume,
  }
}
