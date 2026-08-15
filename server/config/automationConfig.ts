export interface EdsConfig {
  url: string;
  login: string;
  password: string;
  headless: boolean;
}

export const AUTOMATION_SCENARIO = {
  category:
    '23.4. Обеспечение доступа в квартиру для проведения ТО ВКГО совместно с СО',
  status: 'Требуется доработка',
  districts: ['Немчиновка', 'Новоивановское'],
} as const;

export function getEdsConfig(): EdsConfig {
  const url = process.env.EDS_URL?.trim();
  const login = process.env.EDS_LOGIN?.trim();
  const password = process.env.EDS_PASSWORD?.trim();
  const missingVariables = [
    ['EDS_URL', url],
    ['EDS_LOGIN', login],
    ['EDS_PASSWORD', password],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (!url || !login || !password) {
    throw new Error(
      `Не указаны переменные окружения: ${missingVariables.join(', ')}`
    );
  }

  return {
    url,
    login,
    password,
    headless: process.env.EDS_HEADLESS !== 'false',
  };
}

export function getAllowedOrigins(): string[] {
  return (process.env.CORS_ALLOWED_ORIGINS ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}
