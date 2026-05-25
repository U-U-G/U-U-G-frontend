'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { NICKNAME_REGEX } from '@/constants/regex'
import { checkNicknameAvailability } from '@/apis/user'
import Button from '@/components/common/button/Button'
import InputBox from '@/components/common/input/InputBox'
import HelperText from '@/components/common/text/HelperText'

type HelperState = {
  text: string
  status: 'default' | 'success' | 'error' | 'empty'
}

const DEFAULT_HELPER: HelperState = {
  text: '- 특수 문자 입력 불가/2자 이상 10자 이하로 입력해주세요.',
  status: 'default',
}

interface NicknameSectionProps {
  onNicknameChecked?: (checked: boolean) => void
}

export default function NicknameSection({
  onNicknameChecked,
}: NicknameSectionProps) {
  const [nickname, setNickname] = useState('')
  const [inputStatus, setInputStatus] = useState<
    'default' | 'success' | 'error'
  >('default')
  const [helper, setHelper] = useState<HelperState>(DEFAULT_HELPER)

  const nicknameMutation = useMutation({
    mutationFn: checkNicknameAvailability,
    onSuccess: () => {
      setHelper({ text: '사용 가능한 닉네임입니다.', status: 'success' })
      setInputStatus('success')
      onNicknameChecked?.(true)
    },
    onError: () => {
      setHelper({ text: '이미 사용 중인 닉네임입니다.', status: 'error' })
      setInputStatus('error')
    },
  })

  function handleCheckNickname() {
    if (nickname.length < 2 || nickname.length > 10) {
      setHelper({ text: '2자 이상 10자 이하로 입력해주세요.', status: 'error' })
      setInputStatus('error')
      return
    }

    if (NICKNAME_REGEX.test(nickname)) {
      setHelper({ text: '특수문자가 포함되어 있습니다.', status: 'error' })
      setInputStatus('error')
      return
    }

    nicknameMutation.mutate(nickname)
  }

  return (
    <div className="flex flex-col">
      <label className="p4 mb-1.75" htmlFor="nickname">
        닉네임
      </label>
      <div className="flex gap-2.75">
        <InputBox
          id="nickname"
          type="text"
          name="nickname"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value)
            setInputStatus('default')
            setHelper(DEFAULT_HELPER)
            onNicknameChecked?.(false)
          }}
          placeholder="닉네임을 입력해주세요."
          status={inputStatus}
          aria-describedby="nickname-desc"
        />
        <Button
          onClick={handleCheckNickname}
          disabled={nicknameMutation.isPending}
          className="p4"
        >
          중복확인
        </Button>
      </div>
      <HelperText id="nickname-desc" status={helper.status}>
        {helper.text}
      </HelperText>
    </div>
  )
}
