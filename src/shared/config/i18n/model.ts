import en from './locales/en.json';
import ru from './locales/ru.json';

export type Language = 'ru' | 'en';
export type TranslationParams = Record<string, string | number>;
export type Translate = (key: string, params?: TranslationParams) => string;

const translations: Record<Language, Record<string, string>> = { ru, en };

export function translate(
  language: Language,
  key: string,
  params?: TranslationParams
): string {
  const value = translations[language]?.[key] ?? translations.ru[key] ?? key;

  if (!params) return value;

  return Object.entries(params).reduce(
    (result, [name, replacement]) =>
      result.replaceAll(`{${name}}`, String(replacement)),
    value
  );
}
