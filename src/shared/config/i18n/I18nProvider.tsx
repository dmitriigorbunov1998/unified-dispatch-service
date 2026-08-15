import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { I18nContext } from './I18nContext';
import { translate, type Language } from './model';
import { loadLanguage, saveLanguage } from './storage';

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [lang, setLang] = useState<Language>(loadLanguage);

  useEffect(() => {
    saveLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) =>
      translate(lang, key, params),
    [lang]
  );

  const value = useMemo(
    () => ({ t, lang, setLang, isRu: lang === 'ru', isEn: lang === 'en' }),
    [lang, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
