import { createContext, useContext } from 'react';

import type { Language, Translate } from './model';

export interface I18nContextValue {
  t: Translate;
  lang: Language;
  setLang: (language: Language) => void;
  isRu: boolean;
  isEn: boolean;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useTranslation(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }

  return context;
}
