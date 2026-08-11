import { Settings } from './Settings';
import { useTranslation } from '@/shared/config/i18n';

export function SettingsContainer() {
  const { t } = useTranslation();
  return <Settings title={t('settings.title')} />;
}
