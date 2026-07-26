import { Activity, Database, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { useTranslation } from '@/i18n';

export type TabId = 'dashboard' | 'settings' | 'database';

export interface Tab {
  id: TabId;
  label: string;
  title: string;
  icon: LucideIcon;
}

interface TabConfig {
  id: TabId;
  labelKey: string;
  icon: LucideIcon;
}

const TAB_CONFIGS: TabConfig[] = [
  {
    id: 'dashboard',
    labelKey: 'nav.dashboard',
    icon: Activity,
  },
  {
    id: 'settings',
    labelKey: 'nav.settings',
    icon: Settings,
  },
  {
    id: 'database',
    labelKey: 'nav.database',
    icon: Database,
  },
];

export function useTabs() {
  const { t } = useTranslation();

  const tabs: Tab[] = TAB_CONFIGS.map((config) => ({
    id: config.id,
    label: t(config.labelKey),
    title: t(config.labelKey),
    icon: config.icon,
  }));

  return { tabs };
}
