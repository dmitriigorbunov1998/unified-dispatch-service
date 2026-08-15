import { ArrowRight, LockKeyhole } from 'lucide-react';

import type { Translate } from '@/shared/config/i18n';
import { AppButton } from '@/shared/ui/AppButton';

export function HomeCta({ t }: { t: Translate }) {
  return (
    <section className="landing-section" id="about">
      <div className="landing-container">
        <div className="landing-cta">
          <div className="landing-cta-glow" />
          <div className="landing-cta-content">
            <div className="landing-cta-icon">
              <LockKeyhole size={26} />
            </div>
            <div>
              <h2>{t('home.cta.title')}</h2>
              <p>{t('home.cta.description')}</p>
            </div>
          </div>
          <AppButton to="/dashboard">
            {t('home.actions.goDashboard')}
            <ArrowRight size={19} />
          </AppButton>
        </div>
      </div>
    </section>
  );
}
