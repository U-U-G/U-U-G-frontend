'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import {
  IconChevronDown,
  IconSettingsFilled,
  IconUserFilled,
} from '@tabler/icons-react'

interface HeaderProps {
  className?: string
  userName?: string
}

const NAV_LINKS = [
  { href: '/interview', label: '면접 연습' },
  { href: '/history', label: '연습 이력' },
  { href: '/ranking', label: '랭킹' },
]

export default function Header({
  className = '',
  userName = '음어그',
}: HeaderProps) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  return (
    <header
      className={`w-full h-19.5 px-10 py-5.5 flex items-center justify-between bg-white border-b border-[#E5DDFF] ${className}`}
    >
      <Link href="/" aria-label="홈으로 이동">
        <Image
          src="/logo.png"
          alt="음어그 로고"
          width={77.5}
          height={40.63}
          priority
        />
      </Link>

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
          <div
            className="w-7.5 h-7.5 rounded-full bg-primary mr-3.25"
            aria-hidden="true"
          />
          <span className="p1 mr-3.75">{userName} 님</span>

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
                  href="/settings"
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
                  onClick={() => setOpen(false)}
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
    </header>
  )
}
