import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useTabs } from '@/widgets/Header/model/useTabs';

// Мокаем (подменяем) i18n, чтобы тестировать только логику хука
vi.mock('../../i18n', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'nav.home': 'Home',
        'nav.dashboard': 'Dashboard',
        'nav.settings': 'Settings',
        'nav.database': 'Database',
      };

      return translations[key] || key;
    },

    lang: 'en',
    setLang: vi.fn(),
  }),
}));

describe('useTabs', () => {
  it('should return correct number of tabs', () => {
    const { result } = renderHook(() => useTabs());

    expect(result.current.tabs).toHaveLength(4);
  });

  it('should have correct tab structure', () => {
    const { result } = renderHook(() => useTabs());

    result.current.tabs.forEach((tab) => {
      expect(tab).toHaveProperty('id');
      expect(tab).toHaveProperty('label');
      expect(tab).toHaveProperty('title');
      expect(tab).toHaveProperty('icon');
    });
  });

  it('should translate tab labels', () => {
    const { result } = renderHook(() => useTabs());

    expect(result.current.tabs[0].label).toBe('Home');
    expect(result.current.tabs[1].label).toBe('Dashboard');
    expect(result.current.tabs[2].label).toBe('Database');
    expect(result.current.tabs[3].label).toBe('Settings');
  });
});
