import { ArrowRight, Sparkles } from 'lucide-react';

import edsLogo from '@/assets/logo/eds-logo-transparent.png';
import type { Translate } from '@/shared/config/i18n';
import { AppButton } from '@/shared/ui/AppButton';
import { HOME_BENEFITS } from '../model/content';
import { HOME_ICONS } from './icons';

export function HomeHero({ t }: { t: Translate }) {
  return (
    <section className="landing-hero">
      <div className="landing-container landing-hero-layout">
        <div className="landing-hero-content">
          <div className="landing-hero-intro">
            <div className="landing-badge">
              <Sparkles size={15} />
              {t('home.badge')}
            </div>
            <p className="landing-hero-description">{t('home.description')}</p>
          </div>

          <div className="landing-hero-actions">
            <AppButton to="/dashboard">
              {t('home.actions.start')}
              <ArrowRight size={19} />
            </AppButton>
            <AppButton href="#features" variant="secondary">
              {t('home.actions.learnMore')}
            </AppButton>
          </div>

          <div className="landing-benefit-row">
            {HOME_BENEFITS.map((benefit) => {
              const Icon = HOME_ICONS[benefit.icon];
              return (
                <article className="landing-benefit-item" key={benefit.id}>
                  <div className="landing-benefit-icon">
                    <Icon size={21} />
                  </div>
                  <div>
                    <h2>{t(benefit.titleKey)}</h2>
                    <p>{t(benefit.descriptionKey)}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <img className="landing-hero-logo" src={edsLogo} alt="EDS Manager" />
      </div>
    </section>
  );
}
