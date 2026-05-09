'use client'

import { useEffect, useRef } from 'react'
import {
  createInterviewSessionEventSource,
  getInterviewQuestions,
} from '@/apis/interview-sessions'
import {
  SSE_EVENT_QUESTIONS_READY,
  SSE_EVENT_ERROR,
} from '@/apis/interview-sessions/sse'

export function useWaitForSessionQuestions({
  sessionUuid,
  onReady,
  onError,
}: {
  sessionUuid: string | null
  onReady: (uuid: string) => void
  onError: () => void
}) {
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onReadyRef = useRef(onReady)
  const onErrorRef = useRef(onError)

  onReadyRef.current = onReady
  onErrorRef.current = onError

  useEffect(() => {
    if (!sessionUuid) return

    const controller = new AbortController()
    let streamFinished = false

    const stop = () => {
      controller.abort()
      if (pollRef.current) {
        clearInterval(pollRef.current)
        pollRef.current = null
      }
    }

    const startPolling = () => {
      if (pollRef.current) return
      pollRef.current = setInterval(async () => {
        try {
          const questions = await getInterviewQuestions(sessionUuid, 1)
          if (questions && questions.length > 0) {
            stop()
            onReadyRef.current(sessionUuid)
          }
        } catch {
          // keep polling
        }
      }, 3000)
    }

    createInterviewSessionEventSource(sessionUuid, {
      signal: controller.signal,
      onmessage(ev) {
        if (streamFinished) return
        if (ev.event === SSE_EVENT_QUESTIONS_READY) {
          streamFinished = true
          stop()
          onReadyRef.current(sessionUuid)
          return
        }
        if (ev.event === SSE_EVENT_ERROR) {
          streamFinished = true
          stop()
          onErrorRef.current()
        }
      },
      onerror(err) {
        throw err
      },
    }).catch((err) => {
      if (streamFinished || controller.signal.aborted) return
      console.warn('Session SSE failed, falling back to polling:', err)
      startPolling()
    })

    return () => stop()
  }, [sessionUuid])
}
