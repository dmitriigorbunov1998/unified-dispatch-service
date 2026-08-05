import { Dashboard } from './Dashboard';
import { useLogAutoScroll } from './lib/useLogAutoScroll';
import { DISTRICT_STATS, getTotalApplications } from '@/entities/district';
import { useAutomation } from '@/features/automation';
import { useTranslation } from '@/i18n';

export function DashboardContainer() {
  const { t } = useTranslation();
  const messages = {
    clearError: t('logs.clearError'),
    startError: t('automation.startError'),
    statusError: t('automation.statusError'),
  };

  const automation = useAutomation(messages);
  const logsContentRef = useLogAutoScroll(automation.logs.length);
  const totalApplications = getTotalApplications(DISTRICT_STATS);

  return (
    <Dashboard
      districts={DISTRICT_STATS}
      error={automation.error}
      isClearingLogs={automation.isClearingLogs}
      isRunning={automation.isRunning}
      logs={automation.logs}
      logsContentRef={logsContentRef}
      totalApplications={totalApplications}
      t={t}
      onClearLogs={automation.clearLogs}
      onStart={automation.start}
    />
  );
}
