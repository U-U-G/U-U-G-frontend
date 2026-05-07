'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { jobPostingAnalysisFlowApi } from '@/apis/job-postings'
import {
  createInterviewSession,
  createInterviewSessionEventSource,
  getInterviewQuestions,
} from '@/apis/interview-sessions'
import type { JobPostingDetail } from '@/apis/job-postings/type'
import {
  SSE_EVENT_ERROR,
  SSE_EVENT_JOB_POSTING_ANALYSIS_DONE,
  parseErrorPayload,
  parseJobPostingDonePayload,
} from './sse'
import {
  SSE_EVENT_QUESTIONS_READY,
  SSE_EVENT_ERROR as SESSION_SSE_EVENT_ERROR,
} from '@/apis/interview-sessions/sse'

const GENERATING_DELAY_MS = 2000

export type JobPostingAnalysisPopupState =
  | 'analyzing'
  | 'analysisFailed'
  | 'companyName'
  | 'generating'
  | 'questionFailed'
  | 'complete'
  | 'sessionCreating'
  | 'sessionFailed'
  | null

export function useJobPostingAnalysisFlow() {
  const router = useRouter()
  const [popupState, setPopupState] =
    useState<JobPostingAnalysisPopupState>(null)
  const [companyName, setCompanyName] = useState('')
  const [position, setPosition] = useState('')
  const [jobPostingUuid, setJobPostingUuid] = useState<string | null>(null)
  const [isPolling, setIsPolling] = useState(false)
  const [sessionUuid, setSessionUuid] = useState<string | null>(null)
  const [isSessionPolling, setIsSessionPolling] = useState(false)
  const generatingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sessionPollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const applyJobPostingDetail = useCallback((detail: JobPostingDetail) => {
    if (detail.status === 'DONE') {
      setIsPolling(false)
      const name = detail.companyName || ''
      if (name) {
        setCompanyName(name)
        setPosition(detail.position || '')
        setPopupState('generating')
        generatingTimerRef.current = setTimeout(
          () => setPopupState('complete'),
          GENERATING_DELAY_MS,
        )
      } else {
        setPopupState('companyName')
      }
    } else if (detail.status === 'FAILED') {
      setIsPolling(false)
      const reason = (detail.failureReason ?? '').toLowerCase()
      if (reason.includes('question')) {
        setPopupState('questionFailed')
      } else {
        setPopupState('analysisFailed')
      }
    }
  }, [])

  // Job posting SSE
  useEffect(() => {
    if (!jobPostingUuid || !isPolling) return

    const controller = new AbortController()
    let streamFinished = false

    const stopPolling = () => {
      controller.abort()
      setIsPolling(false)
    }

    jobPostingAnalysisFlowApi
      .createJobPostingAnalysisEventSource(jobPostingUuid, {
        signal: controller.signal,

        async onmessage(ev) {
          if (streamFinished) return

          if (ev.event === SSE_EVENT_JOB_POSTING_ANALYSIS_DONE) {
            streamFinished = true
            stopPolling()

            try {
              const parsed = parseJobPostingDonePayload(ev.data)
              if (!parsed) {
                setPopupState('analysisFailed')
                return
              }
              const id = parsed.jobPostingUuid ?? jobPostingUuid
              const detail = await jobPostingAnalysisFlowApi.getJobPosting(id)
              applyJobPostingDetail(detail)
            } catch {
              setPopupState('analysisFailed')
            }
            return
          }

          if (ev.event === SSE_EVENT_ERROR) {
            streamFinished = true
            stopPolling()

            const data = parseErrorPayload(ev.data ?? '')
            const reason = (data.message ?? '').toLowerCase()
            setPopupState(
              reason.includes('question') ? 'questionFailed' : 'analysisFailed',
            )
            return
          }
        },

        onerror(err) {
          throw err
        },
      })
      .catch((err) => {
        if (streamFinished || controller.signal.aborted) return
        console.error('Job posting SSE error:', err)
      })

    return () => {
      controller.abort()
    }
  }, [jobPostingUuid, isPolling, applyJobPostingDetail])

  // Interview session SSE
  useEffect(() => {
    if (!sessionUuid || !isSessionPolling) return

    const controller = new AbortController()
    let streamFinished = false

    const stopPolling = () => {
      controller.abort()
      setIsSessionPolling(false)
    }

    const startSessionPolling = () => {
      if (sessionPollRef.current) return
      sessionPollRef.current = setInterval(async () => {
        try {
          const questions = await getInterviewQuestions(sessionUuid, 1)
          if (questions && questions.length > 0) {
            clearInterval(sessionPollRef.current!)
            sessionPollRef.current = null
            router.push(`/interview/job-posting/${sessionUuid}/countdown?q=1`)
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
          stopPolling()
          router.push(`/interview/job-posting/${sessionUuid}/countdown?q=1`)
          return
        }

        if (ev.event === SESSION_SSE_EVENT_ERROR) {
          streamFinished = true
          stopPolling()
          setPopupState('sessionFailed')
          return
        }
      },

      onerror(err) {
        throw err
      },
    }).catch((err) => {
      if (streamFinished || controller.signal.aborted) return
      console.warn('Session SSE failed, falling back to polling:', err)
      startSessionPolling()
    })

    return () => {
      controller.abort()
      if (sessionPollRef.current) {
        clearInterval(sessionPollRef.current)
        sessionPollRef.current = null
      }
    }
  }, [sessionUuid, isSessionPolling, router])

  useEffect(() => {
    return () => {
      if (generatingTimerRef.current) clearTimeout(generatingTimerRef.current)
    }
  }, [])

  const createJobPostingMutation = useMutation({
    mutationFn: jobPostingAnalysisFlowApi.createJobPosting,
    onSuccess: async (data) => {
      setJobPostingUuid(data.uuid)

      if (data.status === 'DONE' || data.status === 'FAILED') {
        try {
          const detail = await jobPostingAnalysisFlowApi.getJobPosting(
            data.uuid,
          )
          applyJobPostingDetail(detail)
        } catch {
          setIsPolling(false)
          setPopupState('analysisFailed')
        }
        return
      }

      setIsPolling(true)
    },
    onError: () => {
      setPopupState('analysisFailed')
    },
  })

  const updateCompanyNameMutation = useMutation({
    mutationFn: ({
      uuid,
      companyName: nextName,
    }: {
      uuid: string
      companyName: string
    }) =>
      jobPostingAnalysisFlowApi.updateJobPostingCompanyName(uuid, {
        companyName: nextName,
      }),
  })

  const createSessionMutation = useMutation({
    mutationFn: createInterviewSession,
    onSuccess: (data) => {
      if (companyName || position) {
        sessionStorage.setItem(
          `interview-meta-${data.uuid}`,
          JSON.stringify({ companyName, position }),
        )
      }
      setSessionUuid(data.uuid)
      setIsSessionPolling(true)
    },
    onError: () => {
      setPopupState('sessionFailed')
    },
  })

  function handleClose() {
    setIsPolling(false)
    setIsSessionPolling(false)
    if (generatingTimerRef.current) clearTimeout(generatingTimerRef.current)
    if (sessionPollRef.current) {
      clearInterval(sessionPollRef.current)
      sessionPollRef.current = null
    }
    setPopupState(null)
    setJobPostingUuid(null)
    setSessionUuid(null)
    setCompanyName('')
    setPosition('')
  }

  function handleCompanyNameSubmit(name: string) {
    const trimmed = name.trim()
    if (!jobPostingUuid || !trimmed) return

    updateCompanyNameMutation.mutate(
      { uuid: jobPostingUuid, companyName: trimmed },
      {
        onSuccess: () => {
          setCompanyName(trimmed)
          setPopupState('generating')
          generatingTimerRef.current = setTimeout(
            () => setPopupState('complete'),
            GENERATING_DELAY_MS,
          )
        },
        onError: () => {
          setPopupState('analysisFailed')
        },
      },
    )
  }

  function handleStartInterview() {
    if (!jobPostingUuid) return
    setPopupState('sessionCreating')
    createSessionMutation.mutate({
      jobPostingUuid,
      interviewDate: new Date().toISOString().split('T')[0],
      retry: false,
    })
  }

  return {
    popupState,
    setPopupState,
    companyName,
    createJobPostingMutation,
    handleClose,
    handleCompanyNameSubmit,
    handleStartInterview,
  }
}
