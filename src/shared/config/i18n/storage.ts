import type { Language } from './model';

const LANGUAGE_STORAGE_KEY = 'uds_language';
const LEGACY_LANGUAGE_STORAGE_KEY = 'eds_language';

function isLanguage(value: string | null): value is Language {
  return value === 'ru' || value === 'en';
}

export function loadLanguage(): Language {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (isLanguage(savedLanguage)) return savedLanguage;

  const legacyLanguage = localStorage.getItem(LEGACY_LANGUAGE_STORAGE_KEY);
  if (isLanguage(legacyLanguage)) {
    saveLanguage(legacyLanguage);
    localStorage.removeItem(LEGACY_LANGUAGE_STORAGE_KEY);
    return legacyLanguage;
  }

  return 'ru';
}

export function saveLanguage(language: Language): void {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}
