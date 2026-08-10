import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

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

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;

    document.body.style.backgroundColor = 'transparent';

    const statusBarMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="apple-mobile-web-app-status-bar-style"]'
    );

    statusBarMeta?.setAttribute(
      'content',
      resolvedTheme === 'dark' ? 'black-translucent' : 'default'
    );

    const desktopMedia = window.matchMedia('(min-width: 769px)');
    const themeColor = resolvedTheme === 'dark' ? '#000000' : '#ffffff';

    const syncBrowserCanvas = () => {
      const existingThemeColor = document.querySelector<HTMLMetaElement>(
        'meta[name="theme-color"]'
      );

      if (!desktopMedia.matches) {
        document.documentElement.style.backgroundColor = 'transparent';
        existingThemeColor?.remove();
        return;
      }

      document.documentElement.style.backgroundColor = themeColor;

      const browserThemeColor =
        existingThemeColor ?? document.createElement('meta');

      browserThemeColor.id = 'browser-theme-color';
      browserThemeColor.name = 'theme-color';
      browserThemeColor.content = themeColor;
      browserThemeColor.media = '(min-width: 769px)';

      if (!existingThemeColor) {
        document.head.append(browserThemeColor);
      }
    };

    syncBrowserCanvas();
    desktopMedia.addEventListener('change', syncBrowserCanvas);

    localStorage.setItem(THEME_STORAGE_KEY, theme);

    return () => {
      desktopMedia.removeEventListener('change', syncBrowserCanvas);
    };
  }, [resolvedTheme, theme]);

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
