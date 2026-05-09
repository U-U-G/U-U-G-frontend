'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconFileUnknown } from '@tabler/icons-react'

export default function NotFound() {
  const router = useRouter()

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/home')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="p-6">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6">
          <IconFileUnknown
            className="w-full h-full text-primary"
            aria-hidden="true"
          />
        </div>

        <div className="text-center mb-12 font-light">
          <p className="h1 text-primary mb-2">페이지를 찾을 수 없습니다</p>
          <p className="h3 text-text-primary">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다
          </p>
        </div>

        <div className="flex justify-center gap-6">
          <Link
            href="/home"
            className="h3 px-10 py-3 text-primary font-medium rounded-lg border border-primary bg-secondary"
          >
            홈으로
          </Link>
          <button
            type="button"
            onClick={handleGoBack}
            aria-label="이전 페이지로 돌아가기"
            className="h3 cursor-pointer px-8 py-3 bg-primary text-white font-medium rounded-lg"
          >
            이전 페이지
          </button>
        </div>
      </div>
    </div>
  )
}
