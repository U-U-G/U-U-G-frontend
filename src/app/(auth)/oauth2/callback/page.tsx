'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function OAuth2CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      router.replace('/login')
      return
    }

    router.replace('/')
  }, [router, searchParams])

  return <main className="p-6">로그인 처리 중입니다</main>
}
