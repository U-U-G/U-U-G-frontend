/**
 * 테스트 전용 페이지 — error.tsx 에러 바운더리 e2e 테스트에서 사용
 * NEXT_PUBLIC_ENABLE_E2E_TEST_ROUTES 환경변수가 없으면 404로 처리됩니다.
 */

import { notFound } from 'next/navigation'

export default function TriggerErrorPage(): never {
  if (!process.env.NEXT_PUBLIC_ENABLE_E2E_TEST_ROUTES) {
    notFound()
  }

  throw new Error('테스트용 에러 트리거')
}
