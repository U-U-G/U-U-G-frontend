'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  setAccessToken,
  setRefreshToken,
  setSessionMarker,
} from '@/utils/tokenStorage'

function getCookie(name: string) {
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name + '=([^;]*)'),
  )
  return match ? decodeURIComponent(match[1]) : null
}

export default function OAuth2CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      router.replace(`/login?error=${error}`)
      return
    }

    const accessToken = getCookie('accessToken')
    const refreshToken = getCookie('refreshToken')

    if (accessToken) setAccessToken(accessToken)
    if (refreshToken) setRefreshToken(refreshToken)

    // 쿠키가 HttpOnly라서 읽지 못한 경우에도 로그인 상태를 유지하기 위한 마커
    setSessionMarker()
    router.replace('/home')
  }, [router, searchParams])

  return <main className="p-6">로그인 처리 중입니다</main>
}
