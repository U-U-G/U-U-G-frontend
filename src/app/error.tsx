'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { IconAlertTriangle } from '@tabler/icons-react'

interface Props {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

export default function Error({ error, unstable_retry }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      role="alert"
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="p-6">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6">
          <IconAlertTriangle
            className="w-full h-full text-primary"
            aria-hidden="true"
          />
        </div>

        <div className="text-center mb-12 font-light">
          <p className="h1 text-primary mb-2">오류가 발생했습니다</p>
          <p className="h3 text-text-primary">잠시 후 다시 시도해주세요</p>
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
            onClick={unstable_retry}
            aria-label="페이지 복구 시도하기"
            className="h3 cursor-pointer px-8 py-3 bg-primary text-white font-medium rounded-lg"
          >
            다시 시도
          </button>
        </div>
      </div>
    </div>
  )
}
