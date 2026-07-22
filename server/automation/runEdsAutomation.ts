import { chromium, type Browser, type Page } from 'playwright';

type LogCallback = (message: string) => void;

const SEARCH_VALUES = ['Немчиновка', 'Новоивановское'];

const TARGET_CATEGORY =
  '23.4. Обеспечение доступа в квартиру для проведения ТО ВКГО совместно с СО';

async function authorize(page: Page, addLog: LogCallback) {
  const login = process.env.EDS_LOGIN;
  const password = process.env.EDS_LOG_PASSWORD;

  if (!login || !password) {
    throw new Error('Не указаны EDS_LOGIN или EDS_PASSWORD в файле .env');
  }

  addLog('Открываю портал ЕДС');

  await page.goto(process.env.EDS_URL ?? 'https://eds.mosreg.ru/', {
    waitUntil: 'domcontentloaded',
  });

  addLog('Нажимаю кнопку входа');

  await page.locator('.header-login__link').click();

  addLog('Заполняю данные авторизации');

  await page.locator('input[type="text"]').first().fill(login);
  await page.locator('input[type="password"]').first().fill(password);

  await page
    .getByRole('button', {
      name: /войти/i,
    })
    .click();

  addLog('Ожидаю завершения авторизации');

  await page.waitForLoadState('domcontentloaded');

  addLog('Авторизация выполнена');
}

async function searchApplications(
  page: Page,
  searchValue: string,
  addLog: LogCallback
) {
  addLog(`Начинаю поиск: ${searchValue}`);

  const searchInput = page.locator('.search-input');

  await searchInput.fill(searchValue);
  await searchInput.press('Enter');

  addLog(`Поисковой запрос "${searchValue}" отправлен`);

  await page.waitForTimeout(1500);

  const categoryCells = page.locator('td.cdk-cell.cdk-column-category-name');

  const cellsCount = await categoryCells.count();

  addLog(`Найдено строк в таблице ${cellsCount}`);

  let matchingApplications = 0;

  for (let index = 0; index < cellsCount; index += 1) {
    const categoryCell = categoryCells.nth(index);
    const categoryText = (await categoryCell.innerText()).trim();

    if (!categoryText.includes(TARGET_CATEGORY)) {
      continue;
    }

    matchingApplications += 1;

    addLog(
      `Найдена подходящая заявка ${matchingApplications}: ${categoryText}`
    );

    if (matchingApplications === 0) {
      addLog(`Для "${searchValue}" подходящих заявок не найдено`);
      return;
    }

    addLog(
      `Для "${searchValue}" найдено подходящих заявок: ${matchingApplications}`
    );
  }
}

export async function runEdsAutomation(addLog: LogCallback): Promise<void> {
  let browser: Browser | undefined;

  try {
    addLog('Запускаю Chromium');

    browser = await chromium.launch({
      headless: false,
      slowMo: 100,
    });

    const context = await browser.newContext({
      viewport: {
        width: 1440,
        height: 900,
      },
    });

    const page = await context.newPage();

    await authorize(page, addLog);

    for (const searchValue of SEARCH_VALUES) {
      await searchApplications(page, searchValue, addLog);
    }

    addLog('Обработка звявок завершена');
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Неизвестная ошибка';

    addLog(`Ошибка: ${message}`);

    throw error;
  } finally {
    if (browser) {
      addLog('Закрываю браузер');
      await browser.close();
    }
  }
}
