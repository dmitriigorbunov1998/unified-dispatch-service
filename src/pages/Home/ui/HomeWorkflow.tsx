import type { Translate } from '@/shared/config/i18n';
import { HOME_STEPS } from '../model/content';
import { HOME_ICONS } from './icons';

export function HomeWorkflow({ t }: { t: Translate }) {
  return (
    <section className="landing-section" id="workflow">
      <div className="landing-container">
        <div className="landing-section-heading">
          <span className="landing-section-eyebrow">
            {t('home.workflow.eyebrow')}
          </span>
          <h2>{t('home.workflow.heading')}</h2>
        </div>

        <div className="landing-steps">
          {HOME_STEPS.map((step) => {
            const Icon = HOME_ICONS[step.icon];
            return (
              <article className="landing-step" key={step.number}>
                <div className="landing-step-number">{step.number}</div>
                <div className="landing-step-icon">
                  <Icon size={23} />
                </div>
                <h3>{t(step.titleKey)}</h3>
                <p>{t(step.descriptionKey)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
