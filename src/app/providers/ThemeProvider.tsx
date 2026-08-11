import { useLayoutEffect, useMemo, useState, type ReactNode } from 'react';

import { syncBrowserTheme } from '@/shared/lib/platform/syncBrowserTheme';
import {
  loadTheme,
  saveTheme,
  ThemeContext,
  useSystemTheme,
  type Theme,
} from '@/shared/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(loadTheme);
  const systemTheme = useSystemTheme();
  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  useLayoutEffect(() => {
    saveTheme(theme);
    return syncBrowserTheme(theme, resolvedTheme);
  }, [resolvedTheme, theme]);

  const contextValue = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
