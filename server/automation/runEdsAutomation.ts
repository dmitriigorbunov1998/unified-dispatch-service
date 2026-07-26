import { chromium } from 'playwright';
import type { Browser, BrowserContext, Locator, Page } from 'playwright';

type LogCallback = (message: string) => void;

interface EdsConfig {
  url: string;
  login: string;
  password: string;
}

const CATEGORY_NAME =
  '23.4. Обеспечение доступа в квартиру для проведения ТО ВКГО совместно с СО';

const STATUS_NAME = 'Требуется доработка';

const DISTRICTS = ['Немчиновка', 'Новоивановское'] as const;

/**
 * Случайная пауза между действиями.
 */
function pause(minMilliseconds = 500, maxMilliseconds = 1_200): Promise<void> {
  const delay =
    Math.floor(Math.random() * (maxMilliseconds - minMilliseconds + 1)) +
    minMilliseconds;

  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

/**
 * Экранирует специальные символы для RegExp.
 */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Получение конфигурации из переменных окружения.
 */
function getEdsConfig(): EdsConfig {
  const url = process.env.EDS_URL?.trim();
  const login = process.env.EDS_LOGIN?.trim();
  const password = process.env.EDS_PASSWORD?.trim();

  if (!url || !login || !password) {
    const missingVariables: string[] = [];

    if (!url) {
      missingVariables.push('EDS_URL');
    }

    if (!login) {
      missingVariables.push('EDS_LOGIN');
    }

    if (!password) {
      missingVariables.push('EDS_PASSWORD');
    }

    throw new Error(
      `Не указаны переменные окружения: ${missingVariables.join(', ')}`
    );
  }

  return {
    url,
    login,
    password,
  };
}

/**
 * Ожидает первый видимый элемент из всех найденных.
 *
 * Angular может оставлять в DOM скрытые копии
 * dropdown, кнопок и модальных окон.
 */
async function waitForVisibleLocator(
  locator: Locator,
  elementName: string,
  timeout = 15_000
): Promise<Locator> {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeout) {
    const elementsCount = await locator.count();

    for (let index = 0; index < elementsCount; index += 1) {
      const element = locator.nth(index);

      if (await element.isVisible()) {
        return element;
      }
    }

    await pause(100, 200);
  }

  throw new Error(`Истекло время ожидания элемента: ${elementName}`);
}

/**
 * Авторизация на портале ЕДС.
 */
async function authorize(
  page: Page,
  config: EdsConfig,
  addLog: LogCallback
): Promise<void> {
  addLog(`Открываю портал ЕДС: ${config.url}`);

  await page.goto(config.url, {
    waitUntil: 'domcontentloaded',
    timeout: 30_000,
  });

  await pause(800, 1_500);

  const loginLinks = page.locator('div.header-login__link').filter({
    hasText: /^Войти$/,
  });

  addLog('Ожидаю кнопку «Войти»');

  const loginLink = await waitForVisibleLocator(loginLinks, 'кнопка «Войти»');

  await loginLink.scrollIntoViewIfNeeded();
  await loginLink.hover();

  await pause(400, 800);

  addLog('Открываю форму авторизации');

  await loginLink.click({
    timeout: 15_000,
  });

  await pause(700, 1_300);

  const loginInput = page.locator('input[placeholder="example@mail.ru"]');

  const passwordInput = page.locator(
    'input[placeholder="Пароль"][type="password"]'
  );

  addLog('Ожидаю форму авторизации');

  await loginInput.waitFor({
    state: 'visible',
    timeout: 15_000,
  });

  await passwordInput.waitFor({
    state: 'visible',
    timeout: 15_000,
  });

  addLog('Заполняю логин');

  await loginInput.click();

  await loginInput.pressSequentially(config.login, {
    delay: 80,
  });

  await pause(500, 900);

  addLog('Заполняю пароль');

  await passwordInput.click();

  await passwordInput.pressSequentially(config.password, {
    delay: 90,
  });

  await passwordInput.press('Tab');

  await pause(700, 1_200);

  const authorizeButton = page.locator(
    '.button-container button[type="submit"].lib-button.green'
  );

  addLog('Ожидаю кнопку «Авторизоваться»');

  await authorizeButton.waitFor({
    state: 'visible',
    timeout: 15_000,
  });

  await authorizeButton.scrollIntoViewIfNeeded();

  await page.waitForFunction(
    (selector) => {
      const button = document.querySelector<HTMLButtonElement>(selector);

      return button !== null && !button.disabled;
    },
    '.button-container button[type="submit"].lib-button.green',
    {
      timeout: 15_000,
    }
  );

  const isButtonDisabled = await authorizeButton.isDisabled();

  if (isButtonDisabled) {
    throw new Error('Кнопка «Авторизоваться» осталась заблокированной');
  }

  await authorizeButton.hover();

  await pause(500, 900);

  addLog('Нажимаю кнопку «Авторизоваться»');

  await authorizeButton.click({
    timeout: 15_000,
  });

  addLog('Кнопка «Авторизоваться» нажата');

  await loginInput.waitFor({
    state: 'hidden',
    timeout: 30_000,
  });

  await pause(1_000, 1_800);

  addLog('Авторизация успешно завершена');
}

/**
 * Нажимает видимую кнопку «Применить».
 */
async function clickVisibleApplyButton(
  page: Page,
  filterName: string,
  addLog: LogCallback
): Promise<void> {
  const applyButtons = page.locator('div.lib-card-footer-btn').filter({
    hasText: /^\s*Применить\s*$/,
  });

  addLog(`Ожидаю кнопку «Применить» для фильтра «${filterName}»`);

  const applyButton = await waitForVisibleLocator(
    applyButtons,
    `кнопка «Применить» для фильтра «${filterName}»`
  );

  await applyButton.scrollIntoViewIfNeeded();
  await applyButton.hover();

  await pause(400, 800);

  addLog(`Применяю фильтр «${filterName}»`);

  await applyButton.click({
    timeout: 15_000,
  });

  await pause(900, 1_500);

  addLog(`Фильтр «${filterName}» применён`);
}

/**
 * Выбор категории.
 */
async function selectCategory(page: Page, addLog: LogCallback): Promise<void> {
  addLog('Открываю фильтр «Категория»');

  const categoryFilters = page.locator('div').filter({
    hasText: /^Категория$/,
  });

  const categoryFilter = await waitForVisibleLocator(
    categoryFilters,
    'фильтр «Категория»'
  );

  await categoryFilter.scrollIntoViewIfNeeded();
  await categoryFilter.click({
    timeout: 15_000,
  });

  await pause(600, 1_100);

  addLog(`Выбираю категорию: ${CATEGORY_NAME}`);

  const categoryOptions = page.locator('span.ml-12').filter({
    hasText: new RegExp(`^\\s*${escapeRegExp(CATEGORY_NAME)}\\s*$`),
  });

  const categoryOption = await waitForVisibleLocator(
    categoryOptions,
    `категория «${CATEGORY_NAME}»`
  );

  await categoryOption.scrollIntoViewIfNeeded();
  await categoryOption.click({
    timeout: 15_000,
  });

  await pause(600, 1_100);

  await clickVisibleApplyButton(page, 'Категория', addLog);
}

/**
 * Выбор статуса.
 */
async function selectStatus(page: Page, addLog: LogCallback): Promise<void> {
  addLog('Открываю фильтр «Статус»');

  const statusFilters = page.locator('div').filter({
    hasText: /^Статус$/,
  });

  const statusFilter = await waitForVisibleLocator(
    statusFilters,
    'фильтр «Статус»'
  );

  await statusFilter.scrollIntoViewIfNeeded();
  await statusFilter.click({
    timeout: 15_000,
  });

  await pause(600, 1_100);

  addLog(`Выбираю статус: ${STATUS_NAME}`);

  const statusOptions = page.locator('span.ml-12').filter({
    hasText: new RegExp(`^\\s*${escapeRegExp(STATUS_NAME)}\\s*$`),
  });

  const statusOption = await waitForVisibleLocator(
    statusOptions,
    `статус «${STATUS_NAME}»`
  );

  await statusOption.scrollIntoViewIfNeeded();
  await statusOption.click({
    timeout: 15_000,
  });

  await pause(600, 1_100);

  await clickVisibleApplyButton(page, 'Статус', addLog);
}

/**
 * Выбор районов.
 *
 * Dropdown открываем один раз, потому что после
 * выбора первого района он остаётся открытым.
 */
async function selectDistricts(page: Page, addLog: LogCallback): Promise<void> {
  addLog('Открываю фильтр «Район»');

  const districtDropdowns = page.locator('div').filter({
    hasText: /^Район$/,
  });

  const districtDropdown = await waitForVisibleLocator(
    districtDropdowns,
    'фильтр «Район»'
  );

  await districtDropdown.scrollIntoViewIfNeeded();
  await districtDropdown.click({
    timeout: 15_000,
  });

  await pause(500, 900);

  for (const districtName of DISTRICTS) {
    addLog(`Выбираю район: ${districtName}`);

    /*
     * После каждого клика локатор создаётся заново.
     * Angular может перерисовать список вариантов.
     */
    const districtOptions = page.locator('span.ml-12').filter({
      hasText: new RegExp(`^\\s*${escapeRegExp(districtName)}\\s*$`),
    });

    const districtOption = await waitForVisibleLocator(
      districtOptions,
      `район «${districtName}»`
    );

    await districtOption.scrollIntoViewIfNeeded();
    await districtOption.hover();

    await pause(300, 600);

    await districtOption.click({
      timeout: 15_000,
    });

    addLog(`Район «${districtName}» выбран`);

    await pause(700, 1_200);
  }

  await clickVisibleApplyButton(page, 'Районы', addLog);

  addLog(`Выбраны районы: ${DISTRICTS.join(', ')}`);
}

/**
 * Применение всех фильтров заявок.
 */
async function applyApplicationFilters(
  page: Page,
  addLog: LogCallback
): Promise<void> {
  addLog('Начинаю настройку фильтров заявок');

  await selectCategory(page, addLog);

  await selectStatus(page, addLog);

  await selectDistricts(page, addLog);

  addLog('Все фильтры успешно применены');
}

/**
 * Здесь будет дальнейшая обработка заявок.
 */
async function processApplications(
  page: Page,
  addLog: LogCallback
): Promise<void> {
  addLog('Перехожу к обработке заявок');

  await pause(1_000, 1_800);

  addLog('Фильтры применены. Можно начинать поиск заявок');

  /*
   * Следующий этап:
   *
   * 1. найти карточки заявок;
   * 2. определить количество заявок;
   * 3. открыть первую заявку;
   * 4. получить телефон;
   * 5. изменить статус;
   * 6. сохранить результат.
   */

  void page;
}

/**
 * Главная функция автоматизации.
 */
export async function runEdsAutomation(addLog: LogCallback): Promise<void> {
  let browser: Browser | null = null;
  let context: BrowserContext | null = null;

  try {
    addLog('Проверяю конфигурацию');

    const config = getEdsConfig();

    addLog('Запускаю Chromium');

    browser = await chromium.launch({
      headless: false,
      slowMo: 50,
    });

    context = await browser.newContext({
      viewport: {
        width: 1440,
        height: 900,
      },
    });

    const page = await context.newPage();

    page.setDefaultTimeout(15_000);
    page.setDefaultNavigationTimeout(30_000);

    await authorize(page, config, addLog);

    await applyApplicationFilters(page, addLog);

    await processApplications(page, addLog);

    addLog('Сценарий успешно выполнен');

    /*
     * Временно оставляем страницу открытой,
     * чтобы визуально проверить фильтры.
     */
    await pause(5_000, 7_000);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);

    addLog(`Ошибка: ${message}`);

    throw error;
  } finally {
    if (context) {
      await context.close().catch(() => undefined);
    }

    if (browser) {
      addLog('Закрываю браузер');

      await browser.close().catch(() => undefined);
    }
  }
}
