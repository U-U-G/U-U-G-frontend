// tests/interview-job-posting.spec.ts
// 채용 공고 URL 입력 페이지 (/interview/job-posting)

import { test, expect } from '@playwright/test'
import { setupAuth } from './helpers/auth'

test.describe('공고 등록 페이지 (/interview/job-posting)', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)
  })

  test('페이지 제목과 URL 입력 필드가 렌더링된다', async ({ page }) => {
    await page.goto('/interview/job-posting')

    await expect(
      page.getByRole('heading', { name: '공고 맞춤 면접 연습' }),
    ).toBeVisible()
    await expect(
      page.getByPlaceholder('원티드, 잡코리아 사이트의 채용공고만 가능합니다.'),
    ).toBeVisible()
  })

  test('완료 버튼은 초기에 비활성 상태이다', async ({ page }) => {
    await page.goto('/interview/job-posting')

    await expect(page.getByRole('button', { name: '완료' })).toBeDisabled()
  })

  test('유효하지 않은 URL 입력 시 에러 메시지가 표시된다', async ({ page }) => {
    await page.goto('/interview/job-posting')

    const input = page.getByPlaceholder(
      '원티드, 잡코리아 사이트의 채용공고만 가능합니다.',
    )
    await input.fill('https://invalid-site.com/job/1')
    await input.blur()

    await expect(
      page.getByText('올바른 URL이 아닙니다. 다시 입력해주세요.'),
    ).toBeVisible()
  })

  test('유효한 원티드 URL 입력 시 확인 메시지가 표시된다', async ({ page }) => {
    await page.goto('/interview/job-posting')

    const input = page.getByPlaceholder(
      '원티드, 잡코리아 사이트의 채용공고만 가능합니다.',
    )
    await input.fill('https://wanted.co.kr/wd/1')
    await input.blur()

    await expect(page.getByText('링크가 확인되었습니다.')).toBeVisible()
    await expect(page.getByRole('button', { name: '완료' })).toBeEnabled()
  })
})
