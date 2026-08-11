import { Database } from './Database';
import { useTranslation } from '@/shared/config/i18n';

export function DatabaseContainer() {
  const { t } = useTranslation();
  return <Database title={t('database.title')} />;
}
