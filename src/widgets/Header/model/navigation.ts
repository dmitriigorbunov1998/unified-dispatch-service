export type TabId = 'home' | 'dashboard' | 'settings' | 'database';
export type TabIconName = 'home' | 'activity' | 'database' | 'settings';

export interface TabConfig {
  id: TabId;
  labelKey: string;
  icon: TabIconName;
}

export const TAB_CONFIGS: readonly TabConfig[] = [
  { id: 'home', labelKey: 'nav.home', icon: 'home' },
  { id: 'dashboard', labelKey: 'nav.dashboard', icon: 'activity' },
  { id: 'database', labelKey: 'nav.database', icon: 'database' },
  { id: 'settings', labelKey: 'nav.settings', icon: 'settings' },
];

export const TAB_ROUTES: Record<TabId, string> = {
  home: '/',
  dashboard: '/dashboard',
  settings: '/settings',
  database: '/database',
};

export const ROUTE_TABS: Record<string, TabId> = {
  '/': 'home',
  '/home': 'home',
  '/dashboard': 'dashboard',
  '/settings': 'settings',
  '/database': 'database',
};
