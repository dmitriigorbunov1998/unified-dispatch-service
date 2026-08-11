import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Monitor, Moon, Sun } from 'lucide-react';

import { ROUTE_TABS, TAB_ROUTES, type TabId } from './navigation';
import { useTabs } from './useTabs';
import { useTheme } from '@/shared/theme';
import { useTranslation } from '@/shared/config/i18n';
import { THEME_OPTIONS, type ThemeIconName } from '@/shared/theme';
import { useThemeSheetGesture } from './useThemeSheetGesture';

export function useHeaderControls() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tabs } = useTabs();
  const { t, lang, setLang } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const openThemeMenu = useCallback(() => setThemeMenuOpen(true), []);
  const closeThemeMenu = useCallback(() => setThemeMenuOpen(false), []);

  const activeTab = ROUTE_TABS[location.pathname] ?? 'dashboard';
  const themeIcons = {
    sun: Sun,
    moon: Moon,
    monitor: Monitor,
  } satisfies Record<ThemeIconName, typeof Sun>;
  const selectedThemeOption = THEME_OPTIONS.find(
    (option) => option.value === theme
  );
  const ThemeIcon = themeIcons[selectedThemeOption?.icon ?? 'monitor'];
  const themeOptions = THEME_OPTIONS.map((option) => ({
    ...option,
    icon: themeIcons[option.icon],
    label: t(option.labelKey),
  }));
  const {
    closeSheet,
    dragOffset: themeMenuDragOffset,
    isClosing: themeMenuClosing,
    isDragging: themeMenuDragging,
    openSheet,
  } = useThemeSheetGesture({
    isOpen: themeMenuOpen,
    onOpen: openThemeMenu,
    onClose: closeThemeMenu,
  });

  const handleTabChange = (tabId: TabId) => navigate(TAB_ROUTES[tabId]);
  const handleToggleLang = () => setLang(lang === 'ru' ? 'en' : 'ru');
  const handleToggleThemeMenu = () => {
    if (themeMenuOpen) {
      closeSheet();
      return;
    }

    openSheet();
  };
  const handleSelectTheme = (selectedTheme: Parameters<typeof setTheme>[0]) => {
    setTheme(selectedTheme);
    closeSheet();
  };

  useEffect(() => {
    if (!themeMenuOpen || !window.matchMedia('(max-width: 768px)').matches) {
      return;
    }

    const handleOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      if (
        target.closest('.header-theme-menu') ||
        target.closest('[data-testid="header-theme-toggle"]')
      ) {
        return;
      }

      closeSheet();
    };

    document.addEventListener('pointerdown', handleOutsidePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointerDown);
    };
  }, [closeSheet, themeMenuOpen]);

  return {
    activeTab,
    tabs,
    lang,
    theme,
    themeMenuOpen,
    themeOptions,
    ThemeIcon,
    themeMenuClosing,
    themeMenuDragging,
    themeMenuDragOffset,
    themeMenuRef,
    t,
    onTabChange: handleTabChange,
    onToggleLang: handleToggleLang,
    onToggleThemeMenu: handleToggleThemeMenu,
    onSelectTheme: handleSelectTheme,
  };
}
