import type { RefObject } from 'react';

import type { DistrictStat } from '@/entities/district';
import type { Translate } from '@/shared/config/i18n';

export interface DashboardProps {
  districts: readonly DistrictStat[];
  error: string | null;
  isClearingLogs: boolean;
  isRunning: boolean;
  logs: string[];
  logsContentRef: RefObject<HTMLDivElement | null>;
  totalApplications: number;
  t: Translate;
  onClearLogs: () => Promise<void>;
  onStart: () => Promise<void>;
}
