import { expect, test } from '@playwright/test';

test('запускает автоматизацию и показывает логи', async ({ page }) => {
  let statusRequestCount = 0;

  await page.route('**/api/automation/start', async (route) => {
    await route.fulfill({
      status: 202,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Автоматическая запущена',
      }),
    });
  });

  await page.route('**/api/automation/status', async (route) => {
    statusRequestCount += 1;

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        isRunning: statusRequestCount < 2,
        logs: [
          '[10:00:00] Запускаю Chromium',
          '[10:00:01] Открываю портал ЕДС',
        ],
      }),
    });
  });

  await page.goto('/');

  await page
    .getByRole('button', {
      name: /запустить/i,
    })
    .click();

  await expect(page.getByText(/запускаю Chromium/i)).toBeVisible();

  await expect(page.getByText(/открываю портал ЕДС/i)).toBeVisible();
});
