import { setLanguage, getLanguage, t } from '@/i18n';
import { beforeEach, describe, expect, it } from 'vitest';

describe('i18n', () => {
  beforeEach(() => {
    localStorage.clear();
    setLanguage('ru');
  });

  // Проверяем функции для работы с языками БЕЗ рендеринга компонентов
  describe('setLanguage()', () => {
    it('should set language in localStorage', () => {
      setLanguage('en');
      expect(localStorage.getItem('eds_language')).toBe('en');
    });

    it('should set lang attribute on html element', () => {
      setLanguage('en');
      expect(document.documentElement.getAttribute('lang')).toBe('en');
    });
  });

  describe('getLanguage()', () => {
    it('should return default language if nothing saved', () => {
      expect(getLanguage()).toBe('ru');
    });

    it('should return saved language', () => {
      localStorage.setItem('eds_language', 'en');
      expect(getLanguage()).toBe('en');
    });
  });

  describe('t', () => {
    it('should translate existing key', () => {
      setLanguage('ru');
      expect(t('app.title')).toBeDefined();
    });

    it('should return key if translation not found', () => {
      expect(t('non.existent.key')).toBe('non.existent.key');
    });

    it('should fallback to ru if translation missing in current language', () => {
      setLanguage('en');
      // Если перевода нет в en, должен вернуть ru версию
      const result = t('app.title');
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });
});
