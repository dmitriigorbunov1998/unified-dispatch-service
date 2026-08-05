/**
 * =====================================================
 * i18n — Интернационализация
 * =====================================================
 */
import { useState, useEffect, useCallback } from 'react';
import ru from './locales/ru.json';
import en from './locales/en.json';

export type Language = 'ru' | 'en';

const translations: Record<Language, Record<string, string>> = {
  ru,
  en,
};

let currentLanguage: Language = 'ru';
const LANGUAGE_CHANGE_EVENT = 'eds-language-change';

export function setLanguage(lang: Language): void {
  currentLanguage = lang;
  localStorage.setItem('eds_language', lang);
  document.documentElement.setAttribute('lang', lang);
  window.dispatchEvent(
    new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: lang })
  );
}

export function getLanguage(): Language {
  const saved = localStorage.getItem('eds_language') as Language | null;

  if (saved && (saved === 'ru' || saved === 'en')) {
    currentLanguage = saved;
  }

  return currentLanguage;
}

export function t(
  key: string,
  params?: Record<string, string | number>
): string {
  const translation =
    translations[currentLanguage]?.[key] || translations['ru'][key] || key;

  if (!params) return translation;

  return Object.entries(params).reduce(
    (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
    translation
  );
}

export type Translate = typeof t;

export function useTranslation() {
  const [lang, setLang] = useState<Language>(getLanguage);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);

    const handleLanguageChange = (event: Event) => {
      setLang((event as CustomEvent<Language>).detail);
    };

    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);

    return () => {
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
    };
  }, [lang]);

  const changeLanguage = useCallback((newLang: Language) => {
    setLanguage(newLang);
    setLang(newLang);
  }, []);

  return {
    t,
    lang,
    setLang: changeLanguage,
    isRu: lang === 'ru',
    isEn: lang === 'en',
  };
}
