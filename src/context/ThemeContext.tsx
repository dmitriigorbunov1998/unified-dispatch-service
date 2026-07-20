import type { Theme } from '@shared/utils/types.ts';
import { createContext } from 'react';

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
