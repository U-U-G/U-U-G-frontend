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
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-900 to-gray-900 p-4"
    >
      <div className="overflow-hidden w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-red-500/20">
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/20">
            <IconAlertTriangle className="w-10 h-10 text-red-500" aria-hidden="true" />
          </div>

          <h1 className="mb-2 text-2xl text-center text-white font-light tracking-wide">
            오류가 발생했습니다
          </h1>
          <div className="h-0.5 w-16 bg-red-500/50 mx-auto mb-4" aria-hidden="true" />

          <div className="text-red-100/80 text-center mb-6 font-light">
            <p>잠시 후 다시 시도해 주세요.</p>
            {error.digest && (
              <p className="mt-2 text-xs text-red-300/60 font-mono">
                <span className="sr-only">오류 ID: </span>
                {error.digest}
              </p>
            )}
          </div>

          <div className="flex justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-2.5 bg-white/10 text-white font-medium rounded-lg shadow-lg transition-all duration-200 hover:bg-white/20"
            >
              홈으로
            </Link>
            <button
              type="button"
              onClick={unstable_retry}
              aria-label="페이지 복구 시도하기"
              className="cursor-pointer px-6 py-2.5 bg-linear-to-r from-red-600 to-red-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:from-red-700 hover:to-red-800 hover:-translate-y-0.5 active:translate-y-0 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20 focus:outline-none"
            >
              복구하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
