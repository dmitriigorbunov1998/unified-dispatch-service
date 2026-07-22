import { useRef, useState, useCallback, useMemo } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { THEME_OPTIONS } from '@shared/theme/theme.ts';
import { useTheme } from './useTheme.ts';
import { useTabs } from './useTabs';
import { useClickOutside } from './useClickOutside';
import type { Theme } from '@shared/theme/types.ts';

export function useHeader() {
  const { t, lang, setLang } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { tabs } = useTabs();

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setThemeMenuOpen(false));

  const themeOptions = THEME_OPTIONS.map((opt) => ({
    value: opt.value,
    label: t(opt.labelKey),
    icon: opt.icon,
  }));

  // Иконка текущей темы
  const ThemeIcon = useMemo(() => {
    if (theme === 'system') return Monitor;
    if (theme === 'dark') return Moon;
    return Sun;
  }, [theme]);

  const onToggleLang = useCallback(() => {
    setLang(lang === 'ru' ? 'en' : 'ru');
  }, [lang, setLang]);

  const onToggleThemeMenu = useCallback(() => {
    setThemeMenuOpen((prev) => !prev);
  }, []);

  const onSelectTheme = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme);
      setThemeMenuOpen(false);
    },
    [setTheme]
  );

  return {
    theme,
    themeMenuOpen,
    menuRef,
    tabs,
    themeOptions,
    ThemeIcon,
    t,
    lang,
    onToggleLang,
    onToggleThemeMenu,
    onSelectTheme,
  };
}
