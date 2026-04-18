'use client'

import { useRef, useState } from 'react'
import Button from '@/components/common/button/Button'
import InputBox from '@/components/common/input/InputBox'
import HelperText from '@/components/common/text/HelperText'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const codeSent = timeLeft !== null
  const timerExpired = timeLeft === 0

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current)
    setTimeLeft(180)
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t === null || t <= 1) {
          clearInterval(timerRef.current!)
          return 0
        }
        return t - 1
      })
    }, 1000)
  }

  async function handleSendCode() {
    if (!email || !EMAIL_REGEX.test(email)) {
      setEmailHelper({
        text: '올바른 이메일 주소를 입력해주세요.',
        status: 'error',
      })
      setEmailStatus('error')
      return
    }

    // TODO: 백엔드 API로 이메일 중복 검증
    // const isDuplicate = await checkEmailDuplicate(email)
    // if (isDuplicate) {
    //   setEmailHelper({ text: '이미 사용 중인 이메일입니다.', status: 'error' })
    //   setEmailStatus('error')
    //   return
    // }

    setEmailHelper({ text: '전송 완료', status: 'success' })
    setEmailStatus('success')
    startTimer()
  }

  async function handleVerifyCode() {
    if (!code) {
      setCodeHelper({ text: '인증번호를 입력해주세요.', status: 'error' })
      setCodeStatus('error')
      return
    }

    // TODO: 백엔드 API로 인증번호 확인
    // const isMatch = await verifyEmailCode(email, code)
    // if (!isMatch) {
    //   setCodeHelper({ text: '인증번호가 일치하지 않습니다.', status: 'error' })
    //   setCodeStatus('error')
    //   return
    // }

    if (timerRef.current) clearInterval(timerRef.current)
    setTimeLeft(null)
    setCodeHelper({ text: '인증 완료', status: 'success' })
    setCodeStatus('success')
    onEmailVerified?.(true)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium mb-1.75" htmlFor="email">
        이메일
      </label>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2.75">
          <InputBox
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              onEmailVerified?.(false)
            }}
            placeholder="이메일을 입력해주세요."
            status={emailStatus}
          />
          <Button
            onClick={handleSendCode}
            disabled={codeSent && !timerExpired}
            variant={codeSent ? 'secondary' : 'primary'}
            className={codeSent ? 'bg-primary-light text-primary' : ''}
          >
            {codeSent ? '재전송' : '인증번호'}
          </Button>
        </div>
        <HelperText status={emailHelper.status}>{emailHelper.text}</HelperText>
      </div>
      <div className="flex flex-col gap-2">
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
                <span className="text-sm text-primary">
                  {formatTime(timeLeft)}
                </span>
              ) : undefined
            }
          />
          <Button onClick={handleVerifyCode}>인증확인</Button>
        </div>
        <HelperText status={codeHelper.status}>{codeHelper.text}</HelperText>
      </div>
    </div>
  )
}
