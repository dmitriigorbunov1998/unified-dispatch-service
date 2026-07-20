import type { Theme } from '@shared/utils/types.ts';
import { type ReactNode, useCallback, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext.tsx';
import { getSystemTheme, THEME_STORAGE_KEY } from '../shared/utils/theme.ts';

function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return getSystemTheme();
  }

  return theme;
}

// ThemeProvider — кладёт тему в эту коробку
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // 🔄 Состояние темы
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      return saved;
    }

    return 'system';
  });

  // ✅ Вычисляем resolvedTheme синхронно из theme
  const resolvedTheme = resolveTheme(theme);

  // 👂 Слушаем изменения системной темы
  useEffect(() => {
    if (theme !== 'system') return;

    // Если пользователь выбрал 'system' — следим за системой
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = () => {
      setThemeState((currentTheme) => {
        if (currentTheme === 'system') {
          return 'system';
        }

        return currentTheme;
      });
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  // Применение темы к DOM и сохранение
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [resolvedTheme, theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // 📦 Кладём всё в контекст
  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
