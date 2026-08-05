import { Footer } from './Footer';
import { useTranslation } from '@/i18n';

export function FooterContainer() {
  const { t } = useTranslation();
  return <Footer t={t} />;
}
