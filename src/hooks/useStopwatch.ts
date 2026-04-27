import { useState, useRef, useCallback, useEffect } from 'react'

export function useStopwatch() {
  const [elapsedMs, setElapsedMs] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const pausedAtRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)
  const elapsedMsRef = useRef(0)

  const tick = useCallback(() => {
    if (startTimeRef.current === null) return
    const elapsed = Date.now() - startTimeRef.current + pausedAtRef.current
    elapsedMsRef.current = elapsed
    setElapsedMs(elapsed)
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const resume = useCallback(() => {
    startTimeRef.current = Date.now()
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const pause = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    pausedAtRef.current = elapsedMsRef.current
    startTimeRef.current = null
  }, [])

  useEffect(() => {
    resume()
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [resume])

  return { elapsedMs, elapsedMsRef, pause, resume }
}
