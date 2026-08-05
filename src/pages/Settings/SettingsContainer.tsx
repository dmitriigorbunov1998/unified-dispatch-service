import { Settings } from './Settings';
import { useTranslation } from '@/i18n';

export function SettingsContainer() {
  const { t } = useTranslation();
  return <Settings title={t('settings.title')} />;
}
