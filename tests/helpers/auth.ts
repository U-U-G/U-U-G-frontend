// tests/helpers/auth.ts
// 인증이 필요한 페이지 테스트에서 공통으로 사용하는 로그인 상태 세팅 헬퍼

import type { Page } from '@playwright/test'

export const MOCK_PROFILE = {
  email: 'test@example.com',
  nickname: '테스트유저',
  provider: 'LOCAL',
  profileImageUrl: '',
  createdAt: '2024-01-01T00:00:00Z',
}

/**
 * 로그인 상태 세팅
 * - localStorage에 가짜 accessToken 주입
 * - private API 기본 모킹 (401 리다이렉트 방지)
 *   · GET /users/me
 *   · GET /ranking
 *   · GET /job-postings
 *   · GET /schedules*
 *   · GET /curriculum*
 *   · GET /interview-reports
 *
 * 테스트별로 특정 엔드포인트를 덮어쓰려면 page.route()를 추가로 등록하세요.
 * Playwright는 나중에 등록된 route가 먼저 처리됩니다(LIFO).
 */
export async function setupAuth(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('uug:accessToken', 'fake-access-token')
  })

  await page.route('**/api/users/me', (route) =>
    route.fulfill({
      status: 200,
      json: { success: true, data: MOCK_PROFILE, message: 'OK' },
    }),
  )

  await page.route('**/api/ranking', (route) =>
    route.fulfill({
      status: 200,
      json: {
        success: true,
        data: {
          myRankingResponse: null,
          rankingItemResponseList: [],
          totalCount: 0,
        },
        message: 'OK',
      },
    }),
  )

  await page.route('**/api/job-postings', (route) =>
    route.fulfill({
      status: 200,
      json: { success: true, data: [], message: 'OK' },
    }),
  )

  await page.route('**/api/schedules*', (route) =>
    route.fulfill({
      status: 200,
      // GetScheduleListResponse = Schedule[] — 직접 배열 반환
      json: { success: true, data: [], message: 'OK' },
    }),
  )

  await page.route('**/api/curriculum*', (route) =>
    route.fulfill({
      status: 200,
      json: { success: true, data: [], message: 'OK' },
    }),
  )

  await page.route('**/api/interview-reports', (route) =>
    route.fulfill({
      status: 200,
      json: { success: true, data: [], message: 'OK' },
    }),
  )
}
