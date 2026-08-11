import type { Theme } from './types.ts';

export type ThemeIconName = 'sun' | 'moon' | 'monitor';

export interface ThemeOption {
  value: Theme;
  labelKey: string;
  icon: ThemeIconName;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    value: 'light',
    labelKey: 'theme.light',
    icon: 'sun',
  },
  {
    value: 'dark',
    labelKey: 'theme.dark',
    icon: 'moon',
  },
  {
    value: 'system',
    labelKey: 'theme.system',
    icon: 'monitor',
  },
];
