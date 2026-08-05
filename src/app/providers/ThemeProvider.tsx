import { useEffect, useMemo, useState, type ReactNode } from 'react';

import {
  getDefaultTheme,
  getSystemTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from '@shared/theme';

import { ThemeContext } from '@/shared/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getDefaultTheme);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(
    getSystemTheme
  );

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.remove();
    document.documentElement.style.removeProperty('background-color');
  }, []);

  const contextValue = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
