// tests/forgot-password.spec.ts
// checkEmail (GET /users/email-check):
//   200 → 가입되지 않은 이메일 → 에러 표시
//   409 → 가입된 이메일 → forgot-password 메일 발송

import { test, expect } from '@playwright/test'

test.describe('비밀번호 찾기 (/forgot-password)', () => {
  test('비밀번호 재설정 폼이 렌더링된다', async ({ page }) => {
    await page.goto('/forgot-password')

    await expect(
      page.getByRole('heading', { name: '비밀번호 재설정' }),
    ).toBeVisible()
    await expect(page.getByPlaceholder('이메일을 입력하세요')).toBeVisible()
    await expect(page.getByRole('button', { name: '메일 전송' })).toBeVisible()
  })

  test('잘못된 이메일 형식 입력 시 프론트엔드 에러 메시지가 표시된다', async ({
    page,
  }) => {
    await page.goto('/forgot-password')

    const input = page.getByPlaceholder('이메일을 입력하세요')
    await input.fill('invalid-email')
    await input.blur()

    await expect(
      page.getByText('올바른 이메일 주소를 입력해주세요.'),
    ).toBeVisible()
  })

  test('가입되지 않은 이메일 입력 시 에러 메시지가 표시된다', async ({
    page,
  }) => {
    // 200 응답 = 이메일이 DB에 없음 → 에러 처리
    await page.route('**/api/users/email-check*', (route) =>
      route.fulfill({
        status: 200,
        json: { success: true, data: null, message: 'OK' },
      }),
    )

    await page.goto('/forgot-password')
    const input = page.getByPlaceholder('이메일을 입력하세요')
    await input.fill('notexist@example.com')
    await input.blur()
    await page.getByRole('button', { name: '메일 전송' }).click()

    await expect(page.getByText('가입되지 않은 이메일입니다.')).toBeVisible()
  })

  test('가입된 이메일로 전송 성공 시 버튼이 전송 완료로 변경된다', async ({
    page,
  }) => {
    // 409 응답 = 이메일이 DB에 존재 → 메일 발송 진행
    await page.route('**/api/users/email-check*', (route) =>
      route.fulfill({
        status: 409,
        json: { success: false, data: null, message: 'Conflict' },
      }),
    )
    await page.route('**/api/auth/forgot-password', (route) =>
      route.fulfill({
        status: 200,
        json: { success: true, data: null, message: 'OK' },
      }),
    )

    await page.goto('/forgot-password')
    const input = page.getByPlaceholder('이메일을 입력하세요')
    await input.fill('exist@example.com')
    await input.blur()
    await page.getByRole('button', { name: '메일 전송' }).click()

    await expect(page.getByRole('button', { name: '전송 완료' })).toBeVisible()
  })
})
