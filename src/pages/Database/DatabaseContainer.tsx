import { Database } from './Database';
import { useTranslation } from '@/i18n';

export function DatabaseContainer() {
  const { t } = useTranslation();
  return <Database title={t('database.title')} />;
}
