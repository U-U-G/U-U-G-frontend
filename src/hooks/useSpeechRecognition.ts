import { useState, useRef, useEffect } from 'react'

interface ISpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}

interface ISpeechRecognition extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((e: ISpeechRecognitionEvent) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
}

declare global {
  interface Window {
    SpeechRecognition?: new () => ISpeechRecognition
    webkitSpeechRecognition?: new () => ISpeechRecognition
  }
}

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const recognitionRef = useRef<ISpeechRecognition | null>(null)
  const isPausedRef = useRef(false)
  const accumulatedRef = useRef('')
  const latestFinalRef = useRef('')

  useEffect(() => {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition
    if (!SR) return

    const recognition = new SR()
    recognition.lang = 'ko-KR'
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (e: ISpeechRecognitionEvent) => {
      let final = ''
      let interim = ''
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript
        else interim += e.results[i][0].transcript
      }
      latestFinalRef.current = final
      setTranscript(
        (accumulatedRef.current + ' ' + final).replace(/\s+/g, ' ').trim(),
      )
      setInterimTranscript(interim)
    }

    recognition.onend = () => {
      accumulatedRef.current = (
        accumulatedRef.current +
        ' ' +
        latestFinalRef.current
      ).trim()
      latestFinalRef.current = ''
      if (!isPausedRef.current) recognition.start()
    }

    recognition.start()
    recognitionRef.current = recognition

    return () => {
      recognition.onend = null
      recognition.stop()
    }
  }, [])

  function pause() {
    isPausedRef.current = true
    recognitionRef.current?.stop()
  }

  function resume() {
    isPausedRef.current = false
    recognitionRef.current?.start()
  }

  return { transcript, interimTranscript, pause, resume }
}
