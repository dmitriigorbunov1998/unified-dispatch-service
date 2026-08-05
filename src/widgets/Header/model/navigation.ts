import type { TabId } from './useTabs';

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
