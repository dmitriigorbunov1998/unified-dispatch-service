import { Activity, Settings, Database } from 'lucide-react';
import { useTranslation } from '@/i18n';
import type { LucideIcon } from 'lucide-react';

export interface Tab {
  id: string;
  label: string;
  title: string;
  icon: LucideIcon;
}

interface TabConfig {
  id: string;
  labelKey: string;
  icon: LucideIcon;
}

const TAB_CONFIGS: TabConfig[] = [
  { id: 'dashboard', labelKey: 'nav.dashboard', icon: Activity },
  { id: 'config', labelKey: 'nav.settings', icon: Settings },
  { id: 'database', labelKey: 'nav.database', icon: Database },
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
