import type { LucideIcon } from 'lucide-react';
import type { RefObject } from 'react';

import type { Tab, TabId } from '@/hooks/useTabs';
import type { Theme } from '@shared/theme/types';

interface ThemeOption {
  value: Theme;
  label: string;
  icon: LucideIcon;
}

export interface HeaderProps {
  activeTab: TabId;
  tabs: Tab[];

  lang: string;
  theme: Theme;
  themeMenuOpen: boolean;
  themeOptions: ThemeOption[];
  ThemeIcon: LucideIcon;

  onTabChange: (tabId: TabId) => void;
  onToggleLang: () => void;
  onToggleThemeMenu: () => void;
  onSelectTheme: (theme: Theme) => void;
  onLogout?: () => void;

  themeMenuRef: RefObject<HTMLDivElement | null>;

  t: (key: string) => string;
}
