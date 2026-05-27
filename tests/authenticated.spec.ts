// tests/authenticated.spec.ts
// localStorage에 가짜 토큰 주입 + API 모킹으로 로그인 상태를 시뮬레이션합니다.

import { test, expect } from '@playwright/test'
import { setupAuth, MOCK_PROFILE } from './helpers/auth'

test.describe('헤더 (로그인 상태)', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)
  })

  test('네비게이션 메뉴가 표시된다', async ({ page }) => {
    await page.goto('/ranking')

    const nav = page.getByRole('navigation', { name: '주요 메뉴' })
    await expect(nav).toBeVisible()
    await expect(nav.getByRole('link', { name: '면접 연습' })).toBeVisible()
    await expect(nav.getByRole('link', { name: '연습 이력' })).toBeVisible()
    await expect(nav.getByRole('link', { name: '랭킹' })).toBeVisible()
  })

  test('닉네임이 헤더에 표시된다', async ({ page }) => {
    await page.goto('/ranking')

    await expect(page.getByText('테스트유저 님')).toBeVisible()
  })

  test('프로필 메뉴 버튼을 클릭하면 드롭다운이 열린다', async ({ page }) => {
    await page.goto('/ranking')

    await page.getByRole('button', { name: '프로필 메뉴 열기' }).click()

    await expect(page.getByRole('menu')).toBeVisible()
    await expect(page.getByRole('menuitem', { name: '환경설정' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: '로그아웃' })).toBeVisible()
  })

  test('로그아웃 클릭 시 / 로 이동한다', async ({ page }) => {
    await page.route('**/api/auth/logout', (route) =>
      route.fulfill({
        status: 200,
        json: { success: true, data: null, message: 'OK' },
      }),
    )

    await page.goto('/ranking')
    await page.getByRole('button', { name: '프로필 메뉴 열기' }).click()
    await page.getByRole('menuitem', { name: '로그아웃' }).click()

    await expect(page).toHaveURL('/')
  })
})

test.describe('랭킹 페이지 (/ranking)', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)
    await page.route('**/api/ranking', (route) =>
      route.fulfill({
        status: 200,
        json: {
          success: true,
          data: {
            myRankingResponse: {
              rank: 3,
              nickname: '테스트유저',
              jobTitle: '프론트엔드 개발자',
              bestScore: 85,
              totalSessionCount: 10,
              profileImageUrl: '',
            },
            rankingItemResponseList: [
              {
                rank: 1,
                nickname: '1등유저',
                jobTitle: '백엔드 개발자',
                bestScore: 98,
                totalSessionCount: 20,
                profileImageUrl: '',
              },
              {
                rank: 2,
                nickname: '2등유저',
                jobTitle: 'PM',
                bestScore: 90,
                totalSessionCount: 15,
                profileImageUrl: '',
              },
            ],
            totalCount: 2,
          },
          message: 'OK',
        },
      }),
    )
  })

  test('페이지 타이틀이 렌더링된다', async ({ page }) => {
    await page.goto('/ranking')

    await expect(page.getByText('랭킹을 확인해보세요')).toBeVisible()
  })

  test('나의 순위가 표시된다', async ({ page }) => {
    await page.goto('/ranking')

    await expect(page.getByText('나의 순위')).toBeVisible()
  })

  test('전체 유저 순위 목록이 표시된다', async ({ page }) => {
    await page.goto('/ranking')

    await expect(page.getByText('전체 유저 순위')).toBeVisible()
    await expect(page.getByText('1등유저')).toBeVisible()
    await expect(page.getByText('2등유저')).toBeVisible()
  })
})
