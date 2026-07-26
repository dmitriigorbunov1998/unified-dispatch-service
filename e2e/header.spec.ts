import { expect, test } from '@playwright/test';

test.describe('Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    await page.evaluate(() => {
      localStorage.clear();
    });

    await page.reload();
  });

  test('switches and persists language', async ({ page }) => {
    const languageToggle = page.getByTestId('header-language-toggle');

    await expect(languageToggle).toContainText('RU');

    await languageToggle.click();

    await expect(languageToggle).toContainText('EN');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    await page.reload();

    await expect(page.getByTestId('header-language-toggle')).toContainText(
      'EN'
    );

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('switches active tab and updates URL', async ({ page }) => {
    const settingsTab = page.getByTestId('header-tab-settings');

    await settingsTab.click();

    await expect(page).toHaveURL('/settings');

    await expect(settingsTab).toHaveAttribute('aria-current', 'page');
  });

  test('changes and persists theme', async ({ page }) => {
    await page.getByTestId('header-theme-toggle').click();

    await page.getByTestId('header-theme-option-dark').click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await expect(page.getByTestId('header-theme-toggle')).toBeVisible();

    await page.reload();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('closes theme menu after selection', async ({ page }) => {
    await page.getByTestId('header-theme-toggle').click();

    const darkOption = page.getByTestId('header-theme-option-dark');

    await expect(darkOption).toBeVisible();

    await darkOption.click();

    await expect(darkOption).not.toBeVisible();
  });
});
