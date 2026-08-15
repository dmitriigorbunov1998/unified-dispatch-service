import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  I18nProvider,
  loadLanguage,
  saveLanguage,
  translate,
  useTranslation,
} from '@/shared/config/i18n';

const wrapper = ({ children }: { children: ReactNode }) => (
  <I18nProvider>{children}</I18nProvider>
);

describe('i18n', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads, saves and migrates the selected language', () => {
    expect(loadLanguage()).toBe('ru');

    saveLanguage('en');
    expect(loadLanguage()).toBe('en');
    expect(localStorage.getItem('uds_language')).toBe('en');

    localStorage.clear();
    localStorage.setItem('eds_language', 'en');
    expect(loadLanguage()).toBe('en');
    expect(localStorage.getItem('uds_language')).toBe('en');
    expect(localStorage.getItem('eds_language')).toBeNull();
  });

  it('translates, interpolates and falls back safely', () => {
    expect(translate('en', 'nav.home')).toBe('Home');
    expect(translate('ru', 'logs.entries', { count: 3 })).toContain('3');
    expect(translate('en', 'non.existent.key')).toBe('non.existent.key');
  });

  it('updates every consumer through the provider', () => {
    const first = renderHook(() => useTranslation(), { wrapper });

    act(() => first.result.current.setLang('en'));

    expect(first.result.current.lang).toBe('en');
    expect(first.result.current.t('nav.home')).toBe('Home');
    expect(document.documentElement.lang).toBe('en');
  });
});
