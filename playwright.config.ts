import { defineConfig } from '@playwright/test'

export default defineConfig({
  webServer: {
    command: 'bun dev',
    url: 'http://localhost:3000',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  // 개발 서버(Next.js) 1대 기준: 워커 수를 제한해 병렬 부하로 인한 타임아웃 방지
  workers: 2,
  // 네트워크/타이밍 문제로 인한 간헐적 실패에 대비해 1회 재시도
  retries: 1,
  use: {
    baseURL: 'http://localhost:3000/',
  },
})
