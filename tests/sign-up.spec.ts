// tests/sign-up.spec.ts

import { test, expect } from '@playwright/test'

test.describe('회원가입 페이지 (/sign-up)', () => {
  test('회원가입 폼의 모든 섹션이 렌더링된다', async ({ page }) => {
    await page.goto('/sign-up')

    // 이메일 섹션
    await expect(page.getByLabel('이메일')).toBeVisible()
    await expect(page.getByRole('button', { name: '인증번호' })).toBeVisible()

    // 비밀번호 섹션
    await expect(page.getByLabel('비밀번호', { exact: true })).toBeVisible()

    // 닉네임 섹션
    await expect(page.getByLabel('닉네임')).toBeVisible()

    // 회원가입 버튼
    await expect(page.getByRole('button', { name: '회원가입' })).toBeVisible()
  })

  test('회원가입 버튼은 초기에 비활성 상태이다', async ({ page }) => {
    await page.goto('/sign-up')

    await expect(page.getByRole('button', { name: '회원가입' })).toBeDisabled()
  })

  test('잘못된 이메일 형식으로 인증번호 요청 시 에러 메시지가 표시된다', async ({
    page,
  }) => {
    await page.goto('/sign-up')

    await page.getByLabel('이메일').fill('invalid-email')
    await page.getByRole('button', { name: '인증번호' }).click()

    await expect(
      page.getByText('올바른 이메일 주소를 입력해주세요.'),
    ).toBeVisible()
  })

  test('닉네임 1자 이하 입력 후 중복확인 시 에러 메시지가 표시된다', async ({
    page,
  }) => {
    await page.goto('/sign-up')

    await page.getByLabel('닉네임').fill('a')
    await page.getByRole('button', { name: '중복확인' }).click()

    await expect(
      page.getByText('2자 이상 10자 이하로 입력해주세요.'),
    ).toBeVisible()
  })
})
