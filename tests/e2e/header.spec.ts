import { test, expect } from '@playwright/test';

test.describe('Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('should switch language', async ({ page }) => {
    // Проверяем начальный язык
    await expect(page.locator('.header-btn-lang-label')).toHaveText('RU');

    // Кликаем по кнопке языка
    await page.click('.header-btn-lang-label');

    // Проверяем, что язык изменился
    await expect(page.locator('.header-btn-lang-label')).toHaveText('EN');
  });

  test('should switch tabs', async ({ page }) => {
    // Кликаем по табу Settings
    await page.click('text=Settings');

    // Проверяем, что таб активен
    await expect(page.locator('.header-tab.active')).toContainText('Settings');
  });

  test('should change theme', async ({ page }) => {
    // Открываем меню тьмы
    await page.click('.header-theme-menu .header-btn');

    // Выбираем тёмную тему
    await page.click('text=Dark');

    // Проверяем, что тема применилась
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('should persist language after reload', async ({ page }) => {
    // Меняем язык
    await page.click('.header-btn-lang-label');
    await expect(page.locator('.header-btn-lang-label')).toHaveText('EN');

    // Перезагружаем страницу
    await page.reload();

    // Проверяем, что язык сохранился
    await expect(page.locator('.header-btn-lang-label')).toHaveText('EN');
  });
});
