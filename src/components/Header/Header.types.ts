import type { LucideIcon } from 'lucide-react';
import type { Language } from '@/i18n';
import type { Theme } from '@shared/theme/types.ts';
import * as React from 'react';

export interface HeaderTab {
  id: string;
  label: string;
  title: string;
  icon: LucideIcon;
}

export interface HeaderThemeOption {
  value: Theme;
  label: string;
  icon: LucideIcon;
}

export interface HeaderProps {
  activeTab: string;
  tabs: HeaderTab[];

  lang: Language;
  theme: Theme;
  themeMenuOpen: boolean;

  themeOptions: HeaderThemeOption[];
  ThemeIcon: LucideIcon;

  onTabChange: (tabId: string) => void;
  onToggleLang: () => void;
  onToggleThemeMenu: () => void;
  onSelectTheme: (theme: Theme) => void;
  onLogout?: () => void;

  themeMenuRef: React.RefObject<HTMLDivElement | null>;
  t: (key: string) => string;
}
