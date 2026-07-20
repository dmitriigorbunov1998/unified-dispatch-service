import {
  getThemeIcon,
  getDefaultTheme,
  THEME_OPTIONS,
} from '../utils/theme.ts';
import { Sun, Moon, Monitor } from 'lucide-react';
import { beforeEach, describe, expect, it } from 'vitest';
import type { Theme } from '../utils/types.ts';

describe('Theme Utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getThemeIcon()', () => {
    it('should return Sun for light theme', () => {
      expect(getThemeIcon('light')).toBe(Sun);
    });

    it('should return Moon for dark theme', () => {
      expect(getThemeIcon('dark')).toBe(Moon);
    });

    it('should return Monitor for system theme', () => {
      expect(getThemeIcon('system')).toBe(Monitor);
    });

    it('should return Monitor for unknown theme', () => {
      expect(getThemeIcon('unknown' as Theme)).toBe(Monitor);
    });
  });

  // Проверяем утилиты для темы БЕЗ UI
  describe('getDefaultTheme()', () => {
    it('should return default by default', () => {
      expect(getDefaultTheme()).toBe('system');
    });

    it('should return saved theme from localStorage', () => {
      localStorage.setItem('eds_theme', 'dark');
      expect(getDefaultTheme()).toBe('dark');
    });

    it('should ignore invalid localStorage values', () => {
      localStorage.setItem('eds_theme', 'invalid');
      expect(getDefaultTheme()).toBe('system');
    });
  });

  describe('THEME_OPTIONS', () => {
    it('should have 3 options', () => {
      expect(THEME_OPTIONS).toHaveLength(3);
    });

    it('should have valid structure', () => {
      THEME_OPTIONS.forEach((option) => {
        expect(option).toHaveProperty('value');
        expect(option).toHaveProperty('labelKey');
        expect(option).toHaveProperty('icon');
      });
    });
  });
});
