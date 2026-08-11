import { THEME_OPTIONS } from '../theme.ts';
import { loadTheme, saveTheme } from '../storage';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Theme Utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('theme storage', () => {
    it('should return default by default', () => {
      expect(loadTheme()).toBe('system');
    });

    it('should return saved theme from localStorage', () => {
      localStorage.setItem('eds_theme', 'dark');
      expect(loadTheme()).toBe('dark');
    });

    it('should ignore invalid localStorage values', () => {
      localStorage.setItem('eds_theme', 'invalid');
      expect(loadTheme()).toBe('system');
    });

    it('migrates writes to the UDS storage key', () => {
      localStorage.setItem('eds_theme', 'dark');
      saveTheme('light');

      expect(localStorage.getItem('uds_theme')).toBe('light');
      expect(localStorage.getItem('eds_theme')).toBeNull();
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
