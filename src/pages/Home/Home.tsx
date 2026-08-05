import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Gauge,
  ListChecks,
  LockKeyhole,
  MapPin,
  Play,
  Settings2,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import edsLogo from '@/assets/logo/eds-logo-transparent.png';
import { AppButton } from '@/shared/ui/AppButton/AppButton';
import {
  HOME_BENEFITS,
  HOME_FEATURES,
  HOME_STEPS,
  type HomeIconName,
} from './model/content';
import type { Translate } from '@/i18n';

import './Home.css';

const HOME_ICONS = {
  activity: Activity,
  bot: Bot,
  chart: BarChart3,
  shield: ShieldCheck,
  zap: Zap,
  gauge: Gauge,
  mapPin: MapPin,
  settings: Settings2,
  play: Play,
  list: ListChecks,
  check: CheckCircle2,
} satisfies Record<HomeIconName, typeof Activity>;

interface HomeProps {
  t: Translate;
}

export function Home({ t }: HomeProps) {
  return (
    <div className="landing">
      <div id="top">
        <section className="landing-hero">
          <div className="landing-container landing-hero-layout">
            <div className="landing-hero-content">
              <div className="landing-hero-intro">
                <div className="landing-badge">
                  <Sparkles size={15} />
                  {t('home.badge')}
                </div>

                <p className="landing-hero-description">
                  {t('home.description')}
                </p>
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

            <img
              className="landing-hero-logo"
              src={edsLogo}
              alt="EDS Manager"
            />
          </div>
        </section>

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

        <section
          className="landing-section landing-section--dark"
          id="benefits"
        >
          <div className="landing-container landing-showcase">
            <div className="landing-showcase-content">
              <span className="landing-section-eyebrow">
                {t('home.advantages.eyebrow')}
              </span>

              <h2>
                {t('home.advantages.titleFirst')}
                <br />
                {t('home.advantages.titleSecond')}
              </h2>

              <p>{t('home.advantages.description')}</p>

              <ul className="landing-check-list">
                <li>
                  <CheckCircle2 size={18} />
                  {t('home.advantages.authorization')}
                </li>

                <li>
                  <CheckCircle2 size={18} />
                  {t('home.advantages.filters')}
                </li>

                <li>
                  <CheckCircle2 size={18} />
                  {t('home.advantages.logs')}
                </li>

                <li>
                  <CheckCircle2 size={18} />
                  {t('home.advantages.statistics')}
                </li>
              </ul>

              <AppButton to="/dashboard">
                {t('home.actions.openDashboard')}
                <ArrowRight size={19} />
              </AppButton>
            </div>

            <div className="landing-dashboard-preview">
              <div className="landing-preview-header">
                <div className="landing-preview-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <span>EDS Manager</span>
              </div>

              <div className="landing-preview-body">
                <aside className="landing-preview-sidebar">
                  <div className="landing-preview-sidebar-logo">
                    <Bot size={19} />
                  </div>

                  <span className="is-active" />
                  <span />
                  <span />
                  <span />
                </aside>

                <div className="landing-preview-content">
                  <div className="landing-preview-title">
                    <div>
                      <span />
                      <span />
                    </div>

                    <div className="landing-preview-run">
                      <Play size={14} />
                    </div>
                  </div>

                  <div className="landing-preview-stats">
                    <div>
                      <strong>1248</strong>
                      <span>{t('dashboard.stats.total')}</span>
                    </div>

                    <div>
                      <strong>23</strong>
                      <span>{t('home.preview.inProgress')}</span>
                    </div>

                    <div>
                      <strong>1156</strong>
                      <span>{t('home.preview.completed')}</span>
                    </div>

                    <div>
                      <strong>12</strong>
                      <span>{t('dashboard.stats.errors')}</span>
                    </div>
                  </div>

                  <div className="landing-preview-panels">
                    <div className="landing-preview-chart">
                      <div className="landing-preview-panel-title" />

                      <span style={{ width: '88%' }} />
                      <span style={{ width: '65%' }} />
                      <span style={{ width: '43%' }} />
                    </div>

                    <div className="landing-preview-logs">
                      <div className="landing-preview-panel-title" />

                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
      </div>
    </div>
  );
}
