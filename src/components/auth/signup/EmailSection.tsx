'use client'

import { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { EMAIL_REGEX } from '@/constants/regex'
import { signupApi } from '@/apis/auth'
import { checkEmailAvailability } from '@/apis/user'
import Button from '@/components/common/button/Button'
import InputBox from '@/components/common/input/InputBox'
import HelperText from '@/components/common/text/HelperText'

type FieldStatus = 'default' | 'success' | 'error'
type HelperStatus = FieldStatus | 'empty'

type HelperState = {
  text: string
  status: HelperStatus
}

const EMPTY: HelperState = { text: '\u00A0', status: 'empty' }

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

interface EmailSectionProps {
  onEmailVerified?: (verified: boolean) => void
}

export default function EmailSection({ onEmailVerified }: EmailSectionProps) {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [emailStatus, setEmailStatus] = useState<FieldStatus>('default')
  const [codeStatus, setCodeStatus] = useState<FieldStatus>('default')
  const [emailHelper, setEmailHelper] = useState<HelperState>(EMPTY)
  const [codeHelper, setCodeHelper] = useState<HelperState>(EMPTY)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [cooldownLeft, setCooldownLeft] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const codeSent = timeLeft !== null
  const timerExpired = timeLeft === 0

  useEffect(() => {
    if (timerExpired) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      setCodeHelper({ text: '인증시간이 만료되었습니다.', status: 'error' })
      setCodeStatus('error')
    }
  }, [timerExpired])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (cooldownRef.current) clearInterval(cooldownRef.current)
    }
  }, [])

  useEffect(() => {
    if (cooldownLeft === 0 && cooldownRef.current) {
      clearInterval(cooldownRef.current)
      cooldownRef.current = null
    }
  }, [cooldownLeft])

  function startCooldown() {
    if (cooldownRef.current) clearInterval(cooldownRef.current)
    setCooldownLeft(30)
    cooldownRef.current = setInterval(() => {
      setCooldownLeft((c) => (c <= 1 ? 0 : c - 1))
    }, 1000)
  }

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current)
    setTimeLeft(180)
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => (t === null || t <= 1 ? 0 : t - 1))
    }, 1000)
  }

  const sendCodeMutation = useMutation({
    mutationFn: async (email: string) => {
      await checkEmailAvailability(email)
      await signupApi.sendEmailVerificationCode({ email })
    },
    onSuccess: () => {
      setEmailHelper({ text: '전송 완료', status: 'success' })
      setEmailStatus('success')
      startTimer()
      startCooldown()
    },
    onError: (err) => {
      const message =
        isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : '이메일 전송에 실패했습니다.'
      setEmailHelper({ text: message, status: 'error' })
      setEmailStatus('error')
    },
  })

  const verifyCodeMutation = useMutation({
    mutationFn: signupApi.verifyEmailVerification,
    onSuccess: () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      setTimeLeft(null)
      setCodeHelper({ text: '인증 완료', status: 'success' })
      setCodeStatus('success')
      onEmailVerified?.(true)
    },
    onError: () => {
      setCodeHelper({ text: '인증번호가 일치하지 않습니다.', status: 'error' })
      setCodeStatus('error')
    },
  })

  function handleSendCode() {
    if (!email || !EMAIL_REGEX.test(email)) {
      setEmailHelper({
        text: '올바른 이메일 주소를 입력해주세요.',
        status: 'error',
      })
      setEmailStatus('error')
      return
    }
    setCode('')
    setCodeStatus('default')
    setCodeHelper(EMPTY)
    setEmailHelper(EMPTY)
    setEmailStatus('default')
    onEmailVerified?.(false)
    sendCodeMutation.mutate(email)
  }

  function handleVerifyCode() {
    if (!code) {
      setCodeHelper({ text: '인증번호를 입력해주세요.', status: 'error' })
      setCodeStatus('error')
      return
    }
    verifyCodeMutation.mutate({ email, code })
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="p4 mb-1.75" htmlFor="email">
        이메일
      </label>
      <div className="flex flex-col">
        <div className="flex gap-2.75">
          <InputBox
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailStatus('default')
              setEmailHelper(EMPTY)
              onEmailVerified?.(false)
            }}
            placeholder="이메일을 입력해주세요."
            status={emailStatus}
          />
          <Button
            onClick={handleSendCode}
            disabled={sendCodeMutation.isPending || cooldownLeft > 0}
            variant={codeSent ? 'secondary' : 'primary'}
            className={codeSent ? 'p4 bg-primary-light text-primary' : 'p4'}
          >
            {codeSent ? '재전송' : '인증번호'}
          </Button>
        </div>
        <HelperText status={cooldownLeft > 0 ? 'default' : emailHelper.status}>
          {cooldownLeft > 0
            ? `${cooldownLeft}초 후에 다시 전송할 수 있습니다.`
            : emailHelper.text}
        </HelperText>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2.75">
          <InputBox
            type="text"
            name="emailCode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="인증번호를 입력해주세요."
            status={codeStatus}
            rightElement={
              timeLeft !== null && timeLeft > 0 ? (
                <span className="caption text-primary">
                  {formatTime(timeLeft)}
                </span>
              ) : undefined
            }
          />
          <Button
            onClick={handleVerifyCode}
            disabled={verifyCodeMutation.isPending || timerExpired || !codeSent}
            className="p4"
          >
            인증확인
          </Button>
        </div>
        <HelperText status={codeHelper.status}>{codeHelper.text}</HelperText>
      </div>
    </div>
  )
}
