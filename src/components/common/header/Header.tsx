'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

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
  userName = '정우식',
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
          src="/logo.svg"
          alt="음어그 로고"
          width={77.5}
          height={40.63}
          priority
        />
      </Link>

      <div className="flex items-center">
        <nav aria-label="주요 메뉴" className="flex items-center gap-15.25 mr-14.25">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xl font-medium hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center" ref={dropdownRef}>
          <div
            className="w-7.5 h-7.5 rounded-full bg-primary mr-3.25"
            aria-hidden="true"
          />
          <span className="text-xl font-medium mr-3.75">{userName} 님</span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="프로필 메뉴 열기"
              aria-expanded={open}
              aria-haspopup="menu"
              className="group w-7.5 h-7.5 flex items-center justify-center rounded-lg border border-gray5 hover:border-primary hover:cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="text-text-primary group-hover:text-primary"
              >
                <path
                  d="M2.51398 5.00027L1.33398 6.18027L7.93398 12.7803L14.534 6.18027L13.354 5.00027L7.93398 10.4203L2.51398 5.00027Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            {open && (
              <div
                role="menu"
                className="absolute right-0 mt-8 min-w-max bg-white rounded-lg shadow-[0px_0px_8.8px_0px_rgba(0,0,0,0.10)] overflow-hidden z-99"
              >
                <Link
                  href="/settings"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2.5 px-[1.9544rem] py-4.25 font-medium hover:text-primary"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.0005 1.40039C12.5245 1.40041 13.0403 1.439 13.5444 1.51367L14.0454 1.59961L14.1187 1.62012C14.2869 1.67654 14.4241 1.80466 14.4888 1.97266L15.3618 4.24121C15.5829 4.33792 15.7995 4.44392 16.0103 4.55859L18.2935 3.8418L18.3687 3.82324C18.5448 3.79204 18.7282 3.84039 18.8657 3.95898C19.9076 4.85805 20.7759 5.9586 21.4126 7.2002C21.5048 7.38024 21.5009 7.59565 21.4009 7.77148L20.1978 9.88281C20.2619 10.1207 20.3158 10.3628 20.3599 10.6084L22.3413 11.9785C22.5083 12.0941 22.6061 12.2872 22.6001 12.4902C22.5579 13.925 22.2391 15.2912 21.6948 16.5332C21.6123 16.7214 21.438 16.8537 21.2349 16.8848L18.8657 17.2451C18.7234 17.4428 18.5726 17.634 18.4146 17.8184L18.5962 20.2539C18.6113 20.4562 18.5221 20.6533 18.3608 20.7764C17.2765 21.6024 16.0293 22.223 14.6773 22.5801C14.477 22.6329 14.2635 22.5785 14.1128 22.4365L12.3569 20.7783C12.2388 20.7833 12.1197 20.7861 12.0005 20.7861C11.8809 20.7861 11.7615 20.7833 11.6431 20.7783L9.88819 22.4365C9.73758 22.5786 9.52395 22.6326 9.32374 22.5801C7.97152 22.223 6.72459 21.6016 5.64014 20.7754C5.47865 20.6523 5.38967 20.4564 5.40479 20.2539L5.58643 17.8193C5.42811 17.6346 5.27686 17.4431 5.13428 17.2451L2.76612 16.8848C2.56287 16.8539 2.38882 16.7214 2.30616 16.5332C1.76181 15.2909 1.44306 13.9243 1.40088 12.4893C1.39503 12.2862 1.4925 12.094 1.65967 11.9785L3.64014 10.6084C3.68422 10.3629 3.73813 10.1207 3.80225 9.88281L2.6001 7.77148C2.50013 7.59569 2.49521 7.38118 2.58741 7.20117C3.22425 5.95916 4.09302 4.85827 5.13526 3.95898C5.29256 3.82352 5.50947 3.77952 5.70752 3.8418L7.98975 4.55859C8.20054 4.44391 8.41714 4.33793 8.63819 4.24121L9.51319 1.97266L9.54542 1.90332C9.62979 1.74724 9.77994 1.63462 9.95655 1.59961C10.6182 1.46847 11.302 1.40039 12.0005 1.40039ZM12.0005 8.40039C10.0123 8.40039 8.40088 10.0118 8.40088 12C8.40088 13.9882 10.0123 15.5996 12.0005 15.5996C13.9885 15.5994 15.6001 13.9881 15.6001 12C15.6001 10.0119 13.9885 8.40065 12.0005 8.40039Z"
                      fill="currentColor"
                    />
                  </svg>
                  환경설정
                </Link>
                <div className="h-px bg-gray5 mx-3" aria-hidden="true" />
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2.5 px-[1.9544rem] py-4.25 font-medium hover:text-primary hover:cursor-pointer transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 transition-colors"
                  >
                    <path
                      d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM9.64594 7.72594C10.2398 7.09641 11.0756 6.75 12 6.75C12.9244 6.75 13.7527 7.09875 14.3489 7.73156C14.9531 8.37281 15.247 9.23437 15.1777 10.1606C15.0389 12 13.6139 13.5 12 13.5C10.3861 13.5 8.95828 12 8.82234 10.1602C8.75344 9.22641 9.04688 8.36203 9.64594 7.72594ZM12 20.25C10.8987 20.2507 9.80838 20.0303 8.79382 19.6018C7.77927 19.1732 6.86109 18.5453 6.09375 17.7553C6.53323 17.1286 7.0932 16.5957 7.74094 16.1878C8.93578 15.4219 10.448 15 12 15C13.552 15 15.0642 15.4219 16.2577 16.1878C16.9059 16.5955 17.4664 17.1284 17.9062 17.7553C17.139 18.5454 16.2208 19.1734 15.2062 19.6019C14.1917 20.0304 13.1014 20.2508 12 20.25Z"
                      fill="currentColor"
                    />
                  </svg>
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
