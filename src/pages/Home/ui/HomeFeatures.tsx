import type { Translate } from '@/shared/config/i18n';
import { HOME_FEATURES } from '../model/content';
import { HOME_ICONS } from './icons';

export function HomeFeatures({ t }: { t: Translate }) {
  return (
    <section className="landing-section" id="features">
      <div className="landing-container">
        <div className="landing-section-heading">
          <span className="landing-section-eyebrow">
            {t('home.features.eyebrow')}
          </span>
          <h2>{t('home.features.heading')}</h2>
          <p>{t('home.features.description')}</p>
        </div>

        <div className="landing-features-grid">
          {HOME_FEATURES.map((feature) => {
            const Icon = HOME_ICONS[feature.icon];
            return (
              <article className="landing-feature-card" key={feature.id}>
                <div className="landing-feature-icon">
                  <Icon size={26} />
                </div>
                <h3>{t(feature.titleKey)}</h3>
                <p>{t(feature.descriptionKey)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
