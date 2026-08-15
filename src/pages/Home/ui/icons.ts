import {
  Activity,
  BarChart3,
  Bot,
  CheckCircle2,
  Gauge,
  ListChecks,
  MapPin,
  Play,
  Settings2,
  ShieldCheck,
  Zap,
} from 'lucide-react';

import type { HomeIconName } from '../model/content';

export const HOME_ICONS = {
  activity: Activity,
  bot: Bot,
  chart: BarChart3,
  shield: ShieldCheck,
  zap: Zap,
  gauge: Gauge,
  mapPin: MapPin,
  settings: Settings2,
  play: Play,
  list: ListChecks,
  check: CheckCircle2,
} satisfies Record<HomeIconName, typeof Activity>;
