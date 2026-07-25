import { useEffect, useMemo, useRef, useState } from 'react';

import { Header } from './Header';
import { useTabs } from '@/hooks/useTabs';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/hooks/useTheme.ts';
import { getThemeIcon, THEME_OPTIONS } from '@shared/theme/theme';

interface HeaderContainerProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onLogout?: () => void;
}

export function HeaderContainer({
  activeTab,
  onTabChange,
  onLogout,
}: HeaderContainerProps) {
  const { tabs } = useTabs();
  const { t, lang, setLang } = useTranslation();
  const { theme, setTheme } = useTheme();

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const ThemeIcon = getThemeIcon(theme);

  const themeOptions = useMemo(
    () =>
      THEME_OPTIONS.map((option) => ({
        value: option.value,
        icon: option.icon,
        label: t(option.labelKey),
      })),
    [t, lang]
  );

  const handleToggleLanguage = () => {
    setLang(lang === 'ru' ? 'en' : 'ru');
  };

  const handleToggleThemeMenu = () => {
    setThemeMenuOpen((current) => !current);
  };

  const handleSelectTheme = (selectedTheme: Parameters<typeof setTheme>[0]) => {
    setTheme(selectedTheme);
    setThemeMenuOpen(false);
  };

  useEffect(() => {
    if (!themeMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!themeMenuRef.current?.contains(target)) {
        setThemeMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setThemeMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [themeMenuOpen]);

  return (
    <Header
      activeTab={activeTab}
      tabs={tabs}
      lang={lang}
      theme={theme}
      themeMenuOpen={themeMenuOpen}
      themeOptions={themeOptions}
      ThemeIcon={ThemeIcon}
      themeMenuRef={themeMenuRef}
      onTabChange={onTabChange}
      onToggleLang={handleToggleLanguage}
      onToggleThemeMenu={handleToggleThemeMenu}
      onSelectTheme={handleSelectTheme}
      onLogout={onLogout}
      t={t}
    />
  );
}
