import { Home } from './Home';
import { useTranslation } from '@/shared/config/i18n';

export function HomeContainer() {
  const { t } = useTranslation();
  return <Home t={t} />;
}
