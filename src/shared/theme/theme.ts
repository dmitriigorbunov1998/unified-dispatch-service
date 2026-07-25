import { Sun, Moon, Monitor } from 'lucide-react';
import type { Theme } from './types.ts';
import type { LucideIcon } from 'lucide-react';

export interface ThemeOption {
  value: Theme;
  labelKey: string;
  icon: LucideIcon;
}

export const THEME_STORAGE_KEY = 'eds_theme';

export const THEME_OPTIONS: ThemeOption[] = [
  {
    value: 'light',
    labelKey: 'theme.light',
    icon: Sun,
  },
  {
    value: 'dark',
    labelKey: 'theme.dark',
    icon: Moon,
  },
  {
    value: 'system',
    labelKey: 'theme.system',
    icon: Monitor,
  },
];

export function getThemeIcon(theme: Theme): LucideIcon {
  return (
    THEME_OPTIONS.find((option) => option.value === theme)?.icon ?? Monitor
  );
}

export function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}
