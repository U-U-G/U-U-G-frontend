'use client'

import { useState, useRef, Fragment } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { useMutation, useQuery } from '@tanstack/react-query'
import playIcon from '@/assets/icon/play-icon.svg'
import playColorIcon from '@/assets/icon/play-color-icon.svg'
import stopIcon from '@/assets/icon/stop-icon.svg'
import stopColorIcon from '@/assets/icon/stop-color-icon.svg'
import quitIcon from '@/assets/icon/quit-icon.svg'
import quitColorIcon from '@/assets/icon/quit-color-icon.svg'
import Button from '@/components/common/button/Button'
import StopConfirmPopup from '@/components/interview/StopConfirmPopup'
import { useStopwatch } from '@/hooks/useStopwatch'
import { useAudioAnalyzer } from '@/hooks/useAudioAnalyzer'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import {
  getInterviewQuestions,
  completeInterviewSession,
  abandonInterviewSession,
} from '@/apis/interview-sessions'
import { submitAnswer } from '@/apis/questions'
import { TOTAL_QUESTIONS } from '@/constants/interview'

const WARNING_MS = 90 * 1000
const FILLER_SET = new Set(['음', '어', '그'])

function HighlightedText({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          {FILLER_SET.has(word) ? (
            <span className="text-primary">{word}</span>
          ) : (
            word
          )}
        </Fragment>
      ))}
    </>
  )
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const centis = Math.floor((ms % 1000) / 10)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centis).padStart(2, '0')}`
}

interface QuestionSectionProps {
  questionNumber: number
}

export default function QuestionSection({
  questionNumber,
}: QuestionSectionProps) {
  const router = useRouter()
  const { uuid } = useParams<{ uuid: string }>()

  const [isPaused, setIsPaused] = useState(false)
  const [isStopPopupOpen, setIsStopPopupOpen] = useState(false)
  const wasPausedBeforePopupRef = useRef(false)

  const {
    elapsedMs,
    elapsedMsRef,
    pause: stopwatchPause,
    resume: stopwatchResume,
  } = useStopwatch()
  const {
    transcript,
    interimTranscript,
    pause: speechPause,
    resume: speechResume,
  } = useSpeechRecognition()
  const {
    volumeBars,
    dbValue,
    silenceMs,
    isSilenceWarning,
    silencePeriodsRef,
    pause: audioPause,
    resume: audioResume,
  } = useAudioAnalyzer(elapsedMsRef)

  const { data: questions } = useQuery({
    queryKey: ['interview-questions', uuid, questionNumber],
    queryFn: () => getInterviewQuestions(uuid, questionNumber),
  })
  const question = questions?.[0]

  const submitAnswerMutation = useMutation({
    mutationFn: (payload: Parameters<typeof submitAnswer>[1]) =>
      submitAnswer(question!.uuid, payload),
  })

  const completeSessionMutation = useMutation({
    mutationFn: () => completeInterviewSession(uuid),
  })

  const abandonMutation = useMutation({
    mutationFn: () => abandonInterviewSession(uuid),
    onSettled: () => router.push('/interview'),
  })

  const isOverTime = elapsedMs >= WARNING_MS
  const silenceSec = Math.floor(silenceMs / 1000)
  const silenceRatio = Math.min(silenceMs / (5 * 1000), 1)

  function handlePauseResume() {
    if (isPaused) {
      stopwatchResume()
      speechResume()
      audioResume()
      setIsPaused(false)
    } else {
      stopwatchPause()
      speechPause()
      audioPause()
      setIsPaused(true)
    }
  }

  function handleOpenStopPopup() {
    wasPausedBeforePopupRef.current = isPaused
    if (!isPaused) {
      stopwatchPause()
      speechPause()
      audioPause()
      setIsPaused(true)
    }
    setIsStopPopupOpen(true)
  }

  function handleCompleteAnswer() {
    stopwatchPause()
    speechPause()
    audioPause()

    const finalElapsedMs = elapsedMsRef.current
    const periods = [...silencePeriodsRef.current]
    if (isSilenceWarning) {
      periods.push({
        startMs: Math.max(0, finalElapsedMs - silenceMs),
        endMs: finalElapsedMs,
      })
    }

    const fillerWords = transcript
      .trim()
      .split(/\s+/)
      .filter((w) => FILLER_SET.has(w))

    const speechPeriods: { startMs: number; endMs: number }[] = []
    let cursor = 0
    for (const p of periods) {
      if (cursor < p.startMs) {
        speechPeriods.push({ startMs: cursor, endMs: p.startMs })
      }
      cursor = p.endMs
    }
    if (cursor < finalElapsedMs) {
      speechPeriods.push({ startMs: cursor, endMs: finalElapsedMs })
    }

    const isLast = questionNumber >= TOTAL_QUESTIONS

    submitAnswerMutation.mutate(
      {
        totalElapsedMs: finalElapsedMs,
        transcript,
        fillerWords,
        silencePeriods: periods,
        speechPeriods,
      },
      {
        onSuccess: async () => {
          if (isLast) {
            await completeSessionMutation.mutateAsync().catch(() => {})
          }
          router.push(
            `/interview/job-posting/${uuid}/complete?q=${questionNumber}`,
          )
        },
      },
    )
  }

  function handleContinue() {
    if (!wasPausedBeforePopupRef.current) {
      stopwatchResume()
      speechResume()
      audioResume()
      setIsPaused(false)
    }
    setIsStopPopupOpen(false)
  }

  function handleStop() {
    abandonMutation.mutate()
  }

  return (
    <>
      <section className="flex flex-col flex-1 min-h-0 gap-5 px-10 pt-6.5 pb-10">
        <h1 className="h1 w-full">공고 맞춤 면접 연습</h1>

        <div className="flex flex-col w-full min-w-200 bg-white rounded-2xl border border-primary px-9.5 pt-6 pb-10 flex-1 min-h-0 gap-4">
          {/* 상단 진행 바 + 아이콘 */}
          <div className="flex items-center gap-1 shrink-0">
            <div className="flex items-center flex-1">
              {Array.from({ length: TOTAL_QUESTIONS + 1 }, (_, i) => (
                <Fragment key={i}>
                  <div
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${i <= questionNumber ? 'bg-primary' : 'bg-gray-5'}`}
                  />
                  {i < TOTAL_QUESTIONS && (
                    <div
                      className={`flex-1 h-1 ${i < questionNumber ? 'bg-primary' : 'bg-gray-5'}`}
                    />
                  )}
                </Fragment>
              ))}
            </div>
            <button
              type="button"
              onClick={handlePauseResume}
              className="relative group cursor-pointer w-6 h-6 shrink-0 ml-4"
              aria-label={isPaused ? '재개' : '일시정지'}
            >
              <Image
                src={isPaused ? playIcon : stopIcon}
                alt={isPaused ? '재개' : '일시정지'}
                width={24}
                height={24}
                className="group-hover:opacity-0 transition-opacity"
              />
              <Image
                src={isPaused ? playColorIcon : stopColorIcon}
                alt={isPaused ? '재개' : '일시정지'}
                width={24}
                height={24}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
            <button
              type="button"
              onClick={handleOpenStopPopup}
              className="relative group cursor-pointer w-6 h-6 shrink-0"
              aria-label="닫기"
            >
              <Image
                src={quitIcon}
                alt="닫기"
                width={24}
                height={24}
                className="group-hover:opacity-0 transition-opacity"
              />
              <Image
                src={quitColorIcon}
                alt="닫기"
                width={24}
                height={24}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
          </div>

          {/* 질문 배지 + 텍스트 */}
          <div className="flex items-center gap-4.5 shrink-0">
            <span className="shrink-0 bg-secondary text-primary h4 px-4.25 py-0.75 border rounded-full">
              질문 {questionNumber}
            </span>
            <p className="h2">{question?.content ?? ''}</p>
          </div>

          {/* 스톱워치 + 버튼 */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <span
              className={`text-[5rem] font-semibold tabular-nums tracking-tight ${isOverTime ? 'text-text-point-red' : 'text-primary'}`}
            >
              {formatTime(elapsedMs)}
            </span>
            <Button
              className="w-44.75 rounded-full! py-3!"
              onClick={handleCompleteAnswer}
              disabled={!question || submitAnswerMutation.isPending}
            >
              <span className="h3">답변 완료</span>
            </Button>
            {submitAnswerMutation.isError && (
              <p className="p4 text-text-point-red">
                답변 저장에 실패했어요. 다시 시도해주세요.
              </p>
            )}
          </div>

          {/* 하단: 스크립트 + 볼륨/침묵 */}
          <div className="flex gap-7.75 shrink-0">
            <div className="flex flex-col flex-1">
              <div className="bg-secondary rounded-xl p-6.75 h-42 overflow-hidden flex flex-col gap-2">
                <span className="p2 text-gray-1 shrink-0">스크립트</span>
                <p className="p4 text-gray-4 leading-relaxed">
                  <HighlightedText text={transcript} />
                  <span className="opacity-50">
                    <HighlightedText text={interimTranscript} />
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-6.75 flex flex-col gap-9.25 w-93.75 shrink-0 h-42">
              {/* 볼륨 */}
              <div className="flex items-end gap-4">
                <span className="p2 shrink-0">볼륨</span>
                <div className="flex items-end gap-1 h-14 flex-1">
                  {volumeBars.map((vol, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-lg transition-all duration-100"
                      style={{
                        height: `${Math.max(vol * 59, 14)}px`,
                        backgroundColor:
                          vol >= 0.5 ? 'var(--color-primary)' : '#AD97FF',
                      }}
                    />
                  ))}
                </div>
                <span className="p2 shrink-0 w-10.75 text-right tabular-nums">
                  {dbValue}db
                </span>
              </div>

              {/* 침묵 */}
              <div className="flex items-center gap-4">
                <span className="p2 shrink-0">침묵</span>
                <div className="flex-1 h-3.5 bg-gray-5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-colors duration-300 ${isSilenceWarning ? 'bg-text-point-red' : 'bg-primary'}`}
                    style={{ width: `${silenceRatio * 100}%` }}
                  />
                </div>
                <span className="p2 shrink-0">{silenceSec}s</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isStopPopupOpen && (
        <StopConfirmPopup onContinue={handleContinue} onStop={handleStop} />
      )}
    </>
  )
}
