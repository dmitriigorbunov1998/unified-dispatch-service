import { Sun, Moon, Monitor } from 'lucide-react';
import type { Theme } from './types';
import type { LucideIcon } from 'lucide-react';

export interface ThemeOption {
  value: Theme;
  labelKey: string;
  icon: LucideIcon;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { value: 'light', labelKey: 'theme.light', icon: Sun },
  { value: 'dark', labelKey: 'theme.dark', icon: Moon },
  { value: 'system', labelKey: 'theme.system', icon: Monitor },
];

export const THEME_STORAGE_KEY = 'theme';

export const getThemeIcon = (theme: Theme): LucideIcon => {
  const option = THEME_OPTIONS.find((opt) => opt.value === theme);
  return option?.icon || Monitor;
};

export const getDefaultTheme = (): Theme => {
  const saved = (localStorage.getItem('eds_theme') as Theme) || null;
  if (saved && ['light', 'dark', 'system'].includes(saved)) {
    return saved;
  }

  return 'system';
};

export function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}
