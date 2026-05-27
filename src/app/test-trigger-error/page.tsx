/**
 * 테스트 전용 페이지 — error.tsx 에러 바운더리 e2e 테스트에서 사용
 * 프로덕션에서는 404로 처리됩니다.
 */

import { notFound } from 'next/navigation'

export default function TriggerErrorPage(): never {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  throw new Error('테스트용 에러 트리거')
}
