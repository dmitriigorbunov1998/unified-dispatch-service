import type { Theme } from './types';

export const THEME_STORAGE_KEY = 'uds_theme';
const LEGACY_THEME_STORAGE_KEY = 'eds_theme';

export function loadTheme(): Theme {
  const value =
    localStorage.getItem(THEME_STORAGE_KEY) ??
    localStorage.getItem(LEGACY_THEME_STORAGE_KEY);

  return value === 'light' || value === 'dark' || value === 'system'
    ? value
    : 'system';
}

export function saveTheme(theme: Theme): void {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  localStorage.removeItem(LEGACY_THEME_STORAGE_KEY);
}
