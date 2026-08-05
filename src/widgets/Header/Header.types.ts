import type { LucideIcon } from 'lucide-react';
import type { KeyboardEvent, RefObject } from 'react';

import type { Tab, TabId } from './model/useTabs';
import type { Theme } from '@shared/theme';
import type { Translate } from '@/i18n';

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

  filteredTabs: Tab[];
  query: string;
  searchAreaRef: RefObject<HTMLDivElement | null>;
  searchInputRef: RefObject<HTMLInputElement | null>;
  shouldShowDropdown: boolean;
  onClear: () => void;
  onFocus: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onQueryChange: (value: string) => void;
  onSelectResult: (tabId: TabId) => void;

  t: Translate;
}
