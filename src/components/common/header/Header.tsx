'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  IconChevronDown,
  IconSettingsFilled,
  IconUserFilled,
} from '@tabler/icons-react'
import defaultProfileIcon from '@/assets/icon/default-profile-icon.svg'
import {
  getAccessToken,
  hasSessionMarker,
  clearAuthTokens,
} from '@/utils/tokenStorage'
import { getProfile } from '@/apis/user'
import { logout } from '@/apis/auth'

interface HeaderProps {
  className?: string
}

const NAV_LINKS = [
  { href: '/interview', label: '면접 연습' },
  { href: '/history', label: '연습 이력' },
  { href: '/ranking', label: '랭킹' },
]

export default function Header({ className = '' }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [queryEnabled, setQueryEnabled] = useState<boolean | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  useEffect(() => {
    setQueryEnabled(!!(getAccessToken() || hasSessionMarker()))
  }, [])

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getProfile,
    enabled: queryEnabled === true,
    retry: false,
  })

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const { mutate: handleLogout } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearAuthTokens()
      queryClient.removeQueries({ queryKey: ['user', 'profile'] })
      setQueryEnabled(false)
      setOpen(false)
    },
  })

  if (queryEnabled === null || (queryEnabled && isProfileLoading)) {
    return (
      <header
        className={`w-full h-19.5 px-10 py-5.5 flex items-center justify-between bg-white border-b border-[#E5DDFF] ${className}`}
      />
    )
  }

  const isLoggedIn = !!profile

  return (
    <header
      className={`w-full h-19.5 px-10 py-5.5 flex items-center justify-between bg-white border-b border-[#E5DDFF] ${className}`}
    >
      <Link href="/home" aria-label="홈으로 이동">
        <Image
          src="/logo.png"
          alt="음어그 로고"
          width={77.5}
          height={40.63}
          priority
        />
      </Link>

      {isLoggedIn ? (
        <div className="flex items-center">
          <nav
            aria-label="주요 메뉴"
            className="flex items-center gap-15.25 mr-14.25"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="p1 hover:text-primary">
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center" ref={dropdownRef}>
            {isProfileLoading ? (
              <div className="w-30 h-7.5 rounded-lg bg-gray-100 animate-pulse mr-3.25" />
            ) : (
              <>
                <Image
                  src={profile?.profileImageUrl || defaultProfileIcon}
                  alt="프로필 이미지"
                  width={30}
                  height={30}
                  className="rounded-full mr-3.25"
                />
                <span className="p1 mr-3.75">{profile?.nickname} 님</span>
              </>
            )}

            <div className="relative">
              <button
                type="button"
                id="profile-menu-button"
                onClick={() => setOpen((prev) => !prev)}
                aria-label="프로필 메뉴 열기"
                aria-expanded={open}
                aria-haspopup="menu"
                aria-controls="profile-menu"
                className="group w-7.5 h-7.5 flex items-center justify-center rounded-lg border border-gray-5 hover:border-primary hover:cursor-pointer"
              >
                <IconChevronDown
                  size={16}
                  aria-hidden="true"
                  className="text-text-primary group-hover:text-primary"
                />
              </button>

              {open && (
                <div
                  id="profile-menu"
                  role="menu"
                  aria-labelledby="profile-menu-button"
                  className="absolute right-0 mt-8 min-w-max bg-white rounded-lg shadow-[0px_0px_8.8px_0px_rgba(0,0,0,0.10)] overflow-hidden z-50"
                >
                  <Link
                    href="/setting"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2.5 px-8 py-4.25 p4 hover:text-primary"
                  >
                    <IconSettingsFilled
                      size={24}
                      aria-hidden="true"
                      className="shrink-0"
                    />
                    환경설정
                  </Link>
                  <div className="h-px bg-gray-5 mx-3" aria-hidden="true" />
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleLogout()}
                    className="w-full flex items-center justify-center gap-2.5 px-8 py-4.25 p4 hover:text-primary hover:cursor-pointer"
                  >
                    <IconUserFilled
                      size={24}
                      aria-hidden="true"
                      className="shrink-0"
                    />
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Link
          href="/login"
          className="p1 px-4 py-1 rounded-lg bg-primary text-white"
        >
          로그인
        </Link>
      )}
    </header>
  )
}
