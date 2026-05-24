'use client'

import { useState, useEffect, useRef } from 'react'
import { IconPencilFilled } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import InputBox from '@/components/common/input/InputBox'
import HelperText from '@/components/common/text/HelperText'
import ChangePasswordPopup from '@/components/setting/ChangePasswordPopup'
import SignoutConfirmPopup from '@/components/setting/SignoutConfirmPopup'
import defaultProfileIcon from '@/assets/icon/default-profile-icon.svg'
import { useNicknameEdit } from '@/hooks/useNicknameEdit'
import { getProfile, signout, updateProfile, uploadProfileImage } from '@/apis/user'
import { logout } from '@/apis/auth'
import { getHttpStatus } from '@/apis/common/httpError'
import { formatDateToLocale } from '@/utils/date'

export default function UserInfoSection() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false)
  const [isSignoutPopupOpen, setIsSignoutPopupOpen] = useState(false)
  const [isProfileImageMenuOpen, setIsProfileImageMenuOpen] = useState(false)
  const profileImageMenuRef = useRef<HTMLDivElement>(null)
  const profileImageInputRef = useRef<HTMLInputElement>(null)

  const { data: profile, isLoading } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getProfile,
  })

  const { mutate: handleLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear()
      router.push('/login')
    },
    onError: (e) => {
      console.log('로그아웃에 실패하였습니다', e) //TODO: 토스트로 변경
    },
  })

  const { mutate: handleSignout } = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      setIsSignoutPopupOpen(false)
      queryClient.clear()
      router.push('/login')
    },
    onError: (e) => {
      console.log('회원 탈퇴에 실패하였습니다', e) //TODO: 토스트로 변경
    },
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
    setIsDuplicate: setNicknameDuplicate,
  } = useNicknameEdit(profile?.nickname ?? '')

  const { mutate: handleUploadProfileImage, isPending: isUploadingProfileImage } =
    useMutation({
      mutationFn: uploadProfileImage,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      },
      onError: (e) => {
        console.log('프로필 이미지 업로드에 실패하였습니다', e) //TODO: 토스트로 변경
      },
    })

  const { mutate: handleUpdateNickname } = useMutation({
    mutationFn: (nickname: string) =>
      updateProfile({
        email: profile?.email ?? '',
        nickname,
        profileImageUrl: profile?.profileImageUrl ?? '',
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      handleNicknameConfirm()
    },
    onError: (e) => {
      if (getHttpStatus(e) === 409) {
        setNicknameDuplicate(true)
      }
    },
  })

  useEffect(() => {
    if (!isProfileImageMenuOpen) return

    function handleClickOutside(e: MouseEvent) {
      if (profileImageMenuRef.current?.contains(e.target as Node)) return
      setIsProfileImageMenuOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfileImageMenuOpen])

  const handleUploadFromDevice = () => {
    setIsProfileImageMenuOpen(false)
    profileImageInputRef.current?.click()
  }

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    handleUploadProfileImage(file, {
      onSettled: () => {
        if (profileImageInputRef.current) {
          profileImageInputRef.current.value = ''
        }
      },
    })
  }

  if (isLoading || !profile) {
    return <div className="flex-1" />
  }

  return (
    <div className="flex-1">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative h-16 w-16 shrink-0" ref={profileImageMenuRef}>
          <input
            ref={profileImageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isUploadingProfileImage}
            onChange={handleProfileImageChange}
          />
          <Image
            src={
              profile.profileImageUrl?.startsWith('http')
                ? profile.profileImageUrl
                : defaultProfileIcon
            }
            alt="프로필 사진"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
          <button
            type="button"
            className="absolute -right-0.5 -bottom-0.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gray-4 text-white"
            onClick={() => setIsProfileImageMenuOpen((prev) => !prev)}
            aria-label="프로필 사진 변경"
            aria-expanded={isProfileImageMenuOpen}
            aria-haspopup="menu"
          >
            <IconPencilFilled size={15} aria-hidden />
          </button>

          {isProfileImageMenuOpen && (
            <div
              role="menu"
              className="absolute left-20 bottom-0 z-50 min-w-max rounded-lg bg-white shadow-[0_0_16px_0_rgba(99,99,99,0.16)]"
            >
              <button
                type="button"
                role="menuitem"
                disabled={isUploadingProfileImage}
                className="p4 w-full cursor-pointer py-3 px-6 text-text-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleUploadFromDevice}
              >
                기기에서 업로드
              </button>
              <div className="mx-3 h-px bg-gray-5" aria-hidden />
              <button
                type="button"
                role="menuitem"
                className="p4 w-full cursor-pointer py-3 px-6 text-text-primary hover:text-primary"
                onClick={() => setIsProfileImageMenuOpen(false)}
              >
                기본 프로필
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center gap-1">
          <span className="h3 text-text-primary">{profile.nickname}</span>
          <span className="p4 text-gray-4">
            {formatDateToLocale(profile.createdAt)} 가입
          </span>
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
                isEditingNickname
                  ? () => handleUpdateNickname(nicknameInput)
                  : handleNicknameEdit
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
        <button
          type="button"
          className="underline"
          onClick={() => handleLogout()}
        >
          로그아웃
        </button>
        <button
          type="button"
          className="underline"
          onClick={() => setIsSignoutPopupOpen(true)}
        >
          회원탈퇴
        </button>
      </div>

      {isPasswordPopupOpen && (
        <ChangePasswordPopup onClose={() => setIsPasswordPopupOpen(false)} />
      )}
      {isSignoutPopupOpen && (
        <SignoutConfirmPopup
          onCancel={() => setIsSignoutPopupOpen(false)}
          onConfirm={() => {
            handleSignout()
          }}
        />
      )}
    </div>
  )
}
