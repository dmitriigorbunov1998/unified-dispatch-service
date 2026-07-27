import { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Header } from './Header';
import { useTabs } from '@/hooks/useTabs';
import type { TabId } from '@/hooks/useTabs';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/hooks/useTheme';
import { getThemeIcon, THEME_OPTIONS } from '@shared/theme/theme';

const TAB_ROUTES: Record<TabId, string> = {
  home: '/home',
  dashboard: '/dashboard',
  settings: '/settings',
  database: '/database',
};

const ROUTE_TABS: Record<string, TabId> = {
  '/home': 'home',
  '/dashboard': 'dashboard',
  '/settings': 'settings',
  '/database': 'database',
};

interface HeaderContainerProps {
  onLogout?: () => void;
}

export function HeaderContainer({ onLogout }: HeaderContainerProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { tabs } = useTabs();
  const { t, lang, setLang } = useTranslation();
  const { theme, setTheme } = useTheme();

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const activeTab: TabId = ROUTE_TABS[location.pathname] ?? 'dashboard';

  const ThemeIcon = getThemeIcon(theme);

  const themeOptions = useMemo(
    () =>
      THEME_OPTIONS.map((option) => ({
        ...option,
        label: t(option.labelKey),
      })),
    [t]
  );

  const handleTabChange = (tabId: TabId) => {
    navigate(TAB_ROUTES[tabId]);
  };

  const handleToggleLang = () => {
    setLang(lang === 'ru' ? 'en' : 'ru');
  };

  const handleToggleThemeMenu = () => {
    setThemeMenuOpen((isOpen) => !isOpen);
  };

  const handleSelectTheme = (selectedTheme: Parameters<typeof setTheme>[0]) => {
    setTheme(selectedTheme);
    setThemeMenuOpen(false);
  };

  return (
    <Header
      activeTab={activeTab}
      tabs={tabs}
      lang={lang}
      theme={theme}
      themeMenuOpen={themeMenuOpen}
      themeOptions={themeOptions}
      ThemeIcon={ThemeIcon}
      onTabChange={handleTabChange}
      onToggleLang={handleToggleLang}
      onToggleThemeMenu={handleToggleThemeMenu}
      onSelectTheme={handleSelectTheme}
      onLogout={onLogout}
      themeMenuRef={themeMenuRef}
      t={t}
    />
  );
}
