import { Activity, Database, Home, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { useTranslation } from '@/shared/config/i18n';
import { TAB_CONFIGS, type TabIconName, type TabId } from './navigation';

export type { TabId } from './navigation';

export interface Tab {
  id: TabId;
  label: string;
  title: string;
  icon: LucideIcon;
}

const TAB_ICONS = {
  home: Home,
  activity: Activity,
  database: Database,
  settings: Settings,
} satisfies Record<TabIconName, LucideIcon>;

export function useTabs() {
  const { t } = useTranslation();
  const tabs: Tab[] = TAB_CONFIGS.map((config) => ({
    id: config.id,
    label: t(config.labelKey),
    title: t(config.labelKey),
    icon: TAB_ICONS[config.icon],
  }));

  return { tabs };
}
