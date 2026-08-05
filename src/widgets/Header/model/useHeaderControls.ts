import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTE_TABS, TAB_ROUTES } from './navigation';
import { useTabs, type TabId } from './useTabs';
import { useTheme } from '@/shared/theme';
import { useTranslation } from '@/i18n';
import { getThemeIcon, THEME_OPTIONS } from '@/shared/theme';

export function useHeaderControls() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tabs } = useTabs();
  const { t, lang, setLang } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const activeTab = ROUTE_TABS[location.pathname] ?? 'dashboard';
  const ThemeIcon = getThemeIcon(theme);
  const themeOptions = THEME_OPTIONS.map((option) => ({
    ...option,
    label: t(option.labelKey),
  }));

  const handleTabChange = (tabId: TabId) => navigate(TAB_ROUTES[tabId]);
  const handleToggleLang = () => setLang(lang === 'ru' ? 'en' : 'ru');
  const handleToggleThemeMenu = () => setThemeMenuOpen((isOpen) => !isOpen);
  const handleSelectTheme = (selectedTheme: Parameters<typeof setTheme>[0]) => {
    setTheme(selectedTheme);
    setThemeMenuOpen(false);
  };

  return {
    activeTab,
    tabs,
    lang,
    theme,
    themeMenuOpen,
    themeOptions,
    ThemeIcon,
    themeMenuRef,
    t,
    onTabChange: handleTabChange,
    onToggleLang: handleToggleLang,
    onToggleThemeMenu: handleToggleThemeMenu,
    onSelectTheme: handleSelectTheme,
  };
}
