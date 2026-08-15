import { afterEach, describe, expect, it } from 'vitest';

import { getAllowedOrigins, getEdsConfig } from './automationConfig';

const originalEnvironment = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnvironment };
});

describe('automationConfig', () => {
  it('validates and normalizes EDS configuration', () => {
    process.env.EDS_URL = ' https://eds.test ';
    process.env.EDS_LOGIN = ' operator ';
    process.env.EDS_PASSWORD = ' secret ';
    process.env.EDS_HEADLESS = 'false';

    expect(getEdsConfig()).toEqual({
      url: 'https://eds.test',
      login: 'operator',
      password: 'secret',
      headless: false,
    });
  });

  it('reports every missing required variable', () => {
    delete process.env.EDS_URL;
    delete process.env.EDS_LOGIN;
    delete process.env.EDS_PASSWORD;

    expect(() => getEdsConfig()).toThrow(
      'Не указаны переменные окружения: EDS_URL, EDS_LOGIN, EDS_PASSWORD'
    );
  });

  it('returns a normalized CORS allowlist', () => {
    process.env.CORS_ALLOWED_ORIGINS =
      ' https://uds.test, http://localhost:5173, ';

    expect(getAllowedOrigins()).toEqual([
      'https://uds.test',
      'http://localhost:5173',
    ]);
  });
});
