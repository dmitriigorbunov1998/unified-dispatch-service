import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Database,
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
import { Link } from 'react-router';

import logo from '@/assets/logo/eds-logo.png';

import './Landing.css';

const FEATURES = [
  {
    id: 'monitoring',
    title: 'Мониторинг заявок',
    description:
      'Получение актуального состояния заявок и контроль выполнения сценариев.',
    icon: Activity,
  },
  {
    id: 'automation',
    title: 'Автоматическая обработка',
    description:
      'Авторизация, настройка фильтров и обработка заявок без ручной рутины.',
    icon: Bot,
  },
  {
    id: 'statistics',
    title: 'Статистика и отчёты',
    description:
      'Результаты обработки, история запусков и статистика по районам.',
    icon: BarChart3,
  },
  {
    id: 'security',
    title: 'Контроль и безопасность',
    description:
      'Данные авторизации остаются на сервере и не попадают в клиентскую часть.',
    icon: ShieldCheck,
  },
] as const;

const BENEFITS = [
  {
    id: 'speed',
    title: 'Быстрая обработка',
    description:
      'Скрипт последовательно выполняет однотипные действия вместо оператора.',
    icon: Zap,
  },
  {
    id: 'control',
    title: 'Полный контроль',
    description: 'Каждое действие отображается в журнале выполнения.',
    icon: Gauge,
  },
  {
    id: 'districts',
    title: 'Работа по районам',
    description: 'Поддержка обработки Немчиновки и Новоивановского.',
    icon: MapPin,
  },
] as const;

const STEPS = [
  {
    number: '01',
    title: 'Настройка',
    description: 'Указываются адрес портала и серверные данные авторизации.',
    icon: Settings2,
  },
  {
    number: '02',
    title: 'Запуск',
    description: 'Оператор запускает автоматизацию из панели управления.',
    icon: Play,
  },
  {
    number: '03',
    title: 'Обработка',
    description:
      'Система авторизуется, применяет фильтры и находит нужные заявки.',
    icon: ListChecks,
  },
  {
    number: '04',
    title: 'Результат',
    description: 'Логи и статистика позволяют проверить выполнение сценария.',
    icon: CheckCircle2,
  },
] as const;

export function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-container landing-header-inner">
          <a className="landing-brand" href="#top" aria-label="EDS Manager">
            <img className="landing-brand-logo" src={logo} alt="" />

            <span className="landing-brand-name">
              <strong>EDS</strong>
              <span>Manager</span>
            </span>
          </a>

          <nav className="landing-navigation" aria-label="Основная навигация">
            <a href="#features">Возможности</a>

            <a href="#benefits">Преимущества</a>

            <a href="#workflow">Как это работает</a>

            <a href="#about">О проекте</a>
          </nav>

          <Link className="landing-header-action" to="/dashboard">
            Перейти в панель
            <ArrowRight size={17} />
          </Link>
        </div>
      </header>

      <main id="top">
        <section className="landing-hero">
          <div className="landing-background-grid" />

          <div className="landing-hero-orb landing-hero-orb--one" />
          <div className="landing-hero-orb landing-hero-orb--two" />

          <div className="landing-container landing-hero-layout">
            <div className="landing-hero-content">
              <div className="landing-badge">
                <Sparkles size={15} />
                Автоматизация работы с ЕДС
              </div>

              <h1 className="landing-hero-title">
                Автоматизация
                <br />
                обработки заявок
                <br />
                <span>в ЕДС</span>
              </h1>

              <p className="landing-hero-description">
                EDS Manager помогает сократить ручную работу: авторизуется на
                портале, применяет необходимые фильтры и запускает обработку
                заявок.
              </p>

              <div className="landing-hero-actions">
                <Link className="landing-primary-button" to="/dashboard">
                  Начать работу
                  <ArrowRight size={19} />
                </Link>

                <a className="landing-secondary-button" href="#features">
                  Узнать больше
                </a>
              </div>

              <div className="landing-benefit-row">
                {BENEFITS.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <article className="landing-benefit-item" key={benefit.id}>
                      <div className="landing-benefit-icon">
                        <Icon size={21} />
                      </div>

                      <div>
                        <h2>{benefit.title}</h2>
                        <p>{benefit.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="landing-hero-visual">
              <div className="landing-logo-ring landing-logo-ring--outer" />
              <div className="landing-logo-ring landing-logo-ring--middle" />

              <div className="landing-logo-glow" />

              <img
                className="landing-hero-logo"
                src={logo}
                alt="Логотип EDS Manager"
              />

              <div className="landing-floating-card landing-floating-card--top">
                <CheckCircle2 size={18} />
                <span>Фильтры применены</span>
              </div>

              <div className="landing-floating-card landing-floating-card--bottom">
                <Database size={18} />
                <span>Статистика обновлена</span>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section" id="features">
          <div className="landing-container">
            <div className="landing-section-heading">
              <span className="landing-section-eyebrow">Возможности</span>

              <h2>Всё необходимое в одном решении</h2>

              <p>
                Интерфейс объединяет управление автоматизацией, журнал действий
                и статистику выполнения.
              </p>
            </div>

            <div className="landing-features-grid">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article className="landing-feature-card" key={feature.id}>
                    <div className="landing-feature-card-glow" />

                    <div className="landing-feature-icon">
                      <Icon size={26} />
                    </div>

                    <h3>{feature.title}</h3>

                    <p>{feature.description}</p>
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
              <span className="landing-section-eyebrow">Преимущества</span>

              <h2>
                Меньше рутины.
                <br />
                Больше контроля.
              </h2>

              <p>
                Скрипт выполняет последовательный сценарий, а оператор видит
                текущее состояние системы и каждое действие в логах.
              </p>

              <ul className="landing-check-list">
                <li>
                  <CheckCircle2 size={18} />
                  Автоматическая авторизация
                </li>

                <li>
                  <CheckCircle2 size={18} />
                  Выбор категорий, статусов и районов
                </li>

                <li>
                  <CheckCircle2 size={18} />
                  Подробный журнал выполнения
                </li>

                <li>
                  <CheckCircle2 size={18} />
                  Статистика по результатам
                </li>
              </ul>

              <Link className="landing-primary-button" to="/dashboard">
                Открыть панель
                <ArrowRight size={19} />
              </Link>
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
                      <span>Всего заявок</span>
                    </div>

                    <div>
                      <strong>23</strong>
                      <span>В работе</span>
                    </div>

                    <div>
                      <strong>1156</strong>
                      <span>Выполнено</span>
                    </div>

                    <div>
                      <strong>12</strong>
                      <span>Ошибок</span>
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
              <span className="landing-section-eyebrow">Как это работает</span>

              <h2>Простой процесс в 4 шага</h2>
            </div>

            <div className="landing-steps">
              {STEPS.map((step) => {
                const Icon = step.icon;

                return (
                  <article className="landing-step" key={step.number}>
                    <div className="landing-step-number">{step.number}</div>

                    <div className="landing-step-icon">
                      <Icon size={23} />
                    </div>

                    <h3>{step.title}</h3>

                    <p>{step.description}</p>
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
                  <h2>Готовы автоматизировать обработку заявок?</h2>

                  <p>
                    Перейдите в панель управления и запустите первый сценарий.
                  </p>
                </div>
              </div>

              <Link className="landing-primary-button" to="/dashboard">
                Перейти в панель
                <ArrowRight size={19} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-container landing-footer-inner">
          <div className="landing-footer-brand">
            <img src={logo} alt="" />

            <div>
              <strong>Nexus</strong>

              <span>Автоматизация обработки заявок</span>
            </div>
          </div>

          <p>© 2026 Nexus</p>
        </div>
      </footer>
    </div>
  );
}
