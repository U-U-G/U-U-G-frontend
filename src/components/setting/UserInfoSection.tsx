'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import InputBox from '@/components/common/input/InputBox'
import HelperText from '@/components/common/text/HelperText'
import ChangePasswordPopup from '@/components/setting/ChangePasswordPopup'
import defaultProfileIcon from '@/assets/icon/default-profile-icon.svg'
import { useNicknameEdit } from '@/hooks/useNicknameEdit'
import { getProfile } from '@/apis/user'

export default function UserInfoSection() {
  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false)

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const {
    isEditing: isEditingNickname,
    value: nicknameValue,
    input: nicknameInput,
    isDuplicate: nicknameDuplicate,
    hasInput,
    onEdit: handleNicknameEdit,
    onConfirm: handleNicknameConfirm,
    onInputChange: handleNicknameInputChange,
  } = useNicknameEdit(profile?.nickname ?? '')

  if (isLoading || !profile) {
    return <div className="flex-1" />
  }

  return (
    <div className="flex-1">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={profile.profileImageUrl ?? defaultProfileIcon}
          alt="프로필 사진"
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover shrink-0"
        />
        <div className="flex flex-col justify-center gap-1">
          <span className="h3 text-text-primary">{profile.nickname}</span>
          <span className="p4 text-gray-4">{profile.createdAt}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 max-w-4xl items-start">
        <div className="flex flex-col gap-2">
          <label className="p4 text-gray-2">이메일</label>
          <InputBox
            className="border-gray-5 text-gray-4"
            disabled
            defaultValue={profile.email}
          />
        </div>
        <div />
        <div className="flex flex-col gap-2">
          <label className="p4 text-gray-2">닉네임</label>
          <div className="flex flex-row gap-3">
            <InputBox
              className={`border-gray-5 ${isEditingNickname ? 'text-text-primary' : 'text-gray-4'}`}
              disabled={!isEditingNickname}
              value={isEditingNickname ? nicknameInput : nicknameValue}
              onChange={(e) => handleNicknameInputChange(e.target.value)}
              status={nicknameDuplicate ? 'error' : 'default'}
            />
            <button
              type="button"
              disabled={isEditingNickname && !hasInput}
              onClick={
                isEditingNickname ? handleNicknameConfirm : handleNicknameEdit
              }
              className={`p4 shrink-0 px-7 rounded-lg transition-colors ${
                isEditingNickname
                  ? hasInput
                    ? 'bg-primary text-white cursor-pointer'
                    : 'bg-gray-5 text-text-primary cursor-not-allowed'
                  : 'bg-primary text-white cursor-pointer'
              }`}
            >
              {isEditingNickname ? '완료' : '변경'}
            </button>
          </div>
          {nicknameDuplicate && (
            <HelperText status="error">이미 사용 중인 닉네임입니다.</HelperText>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="p4 text-gray-2">비밀번호</label>
          <div className="flex flex-row gap-3">
            <InputBox
              className="border-gray-5 text-gray-4"
              disabled
              defaultValue="********"
            />
            <button
              type="button"
              onClick={() => setIsPasswordPopupOpen(true)}
              className="p4 shrink-0 bg-primary text-white px-6 rounded-lg cursor-pointer"
            >
              재설정
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-14 p4 text-gray-1">
        <button type="button" className="underline">
          로그아웃
        </button>
        <button type="button" className="underline">
          회원탈퇴
        </button>
      </div>

      {isPasswordPopupOpen && (
        <ChangePasswordPopup onClose={() => setIsPasswordPopupOpen(false)} />
      )}
    </div>
  )
}
