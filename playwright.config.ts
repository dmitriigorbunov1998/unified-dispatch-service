import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // playwright.config.ts — для E2E тестов
  testDir: './e2e', // Где лежат E2E тесты
  timeout: 30_000, // Максимальное время теста (30 сек)
  fullyParallel: true,
  retries: 2, // Повторять упавшие тесты 2 раза
  workers: 2, // Запускать 2 теста параллельно

  reporter: [
    ['html', { outputFolder: './playwright-report' }],
    ['json', { outputFile: './playwright-report.results.json' }],
  ],

  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Автоматически запускать dev сервер
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
