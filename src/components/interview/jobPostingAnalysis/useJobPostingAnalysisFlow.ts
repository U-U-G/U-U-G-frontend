'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { jobPostingAnalysisFlowApi } from '@/apis/job-postings'
import type { JobPostingDetail } from '@/apis/job-postings/type'
import {
  SSE_EVENT_ERROR,
  SSE_EVENT_JOB_POSTING_ANALYSIS_DONE,
  parseErrorPayload,
  parseJobPostingDonePayload,
} from './sse'

const GENERATING_DELAY_MS = 2000

export type JobPostingAnalysisPopupState =
  | 'analyzing'
  | 'analysisFailed'
  | 'companyName'
  | 'generating'
  | 'questionFailed'
  | 'complete'
  | null

export function useJobPostingAnalysisFlow() {
  const [popupState, setPopupState] =
    useState<JobPostingAnalysisPopupState>(null)
  const [companyName, setCompanyName] = useState('')
  const [jobPostingUuid, setJobPostingUuid] = useState<string | null>(null)
  const [isPolling, setIsPolling] = useState(false)
  const generatingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const applyJobPostingDetail = useCallback((detail: JobPostingDetail) => {
    if (detail.status === 'DONE') {
      setIsPolling(false)
      const name = detail.companyName || ''
      if (name) {
        setCompanyName(name)
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

  useEffect(() => {
    if (!jobPostingUuid || !isPolling) return

    const controller = new AbortController()
    let streamFinished = false

    const stopPolling = () => {
      controller.abort()
      setIsPolling(false)
    }

    void jobPostingAnalysisFlowApi.createJobPostingAnalysisEventSource(
      jobPostingUuid,
      {
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
              reason.includes('question')
                ? 'questionFailed'
                : 'analysisFailed',
            )
            return
          }
        },

        onerror(error) {
          if (streamFinished || controller.signal.aborted) return
          console.error(error)
        },
      },
    )

    return () => {
      controller.abort()
    }
  }, [jobPostingUuid, isPolling, applyJobPostingDetail])

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

  function handleClose() {
    setIsPolling(false)
    if (generatingTimerRef.current) clearTimeout(generatingTimerRef.current)
    setPopupState(null)
    setJobPostingUuid(null)
    setCompanyName('')
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

  return {
    popupState,
    setPopupState,
    companyName,
    createJobPostingMutation,
    handleClose,
    handleCompanyNameSubmit,
  }
}
