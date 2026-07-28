import './Landing.css';
// import {
//   Activity,
//   ArrowRight,
//   BarChart3,
//   Bot,
//   CheckCircle,
//   Gauge,
//   ListChecks,
//   MapPin,
//   Play,
//   Settings2,
//   ShieldCheck,
//   Zap,
// } from 'lucide-react';

import logo from '@/assets/logo/eds-logo.png';

import { Link } from 'react-router';

// const FEATURES = [
//   {
//     id: 'monitoring',
//     title: 'Мониторинг заявок',
//     description:
//       'Получение актуального состояния заявок и контроль выполнения сценариев.',
//     icon: Activity,
//   },
//   {
//     id: 'automation',
//     title: 'Автоматическая обработка',
//     description:
//       'Авторизация, настройка фильтров и обработка заявок без ручной рутины.',
//     icon: Bot,
//   },
//   {
//     id: 'statistics',
//     title: 'Статистика и отчёты',
//     description:
//       'Результаты обработки, история запусков и статистика по районам.',
//     icon: BarChart3,
//   },
//   {
//     id: 'security',
//     title: 'Контроль и безопасность',
//     description:
//       'Получение актуального состояния заявок и контроль выполнения сценариев.',
//     icon: ShieldCheck,
//   },
// ] as const;
//
// const BENEFITS = [
//   {
//     id: 'speed',
//     title: 'Быстрая обработка',
//     description:
//       'Скрипт последовательно выполняет однотипные действия вместо оператора',
//     icon: Zap,
//   },
//   {
//     id: 'control',
//     title: 'Полный контроль',
//     description: 'Каждое действие отображается в журнале выполнения.',
//     icon: Gauge,
//   },
//   {
//     id: 'districts',
//     title: 'Работа по районам',
//     description: 'Поддержка обработки Немчиновки и Новоивановского.',
//     icon: MapPin,
//   },
// ] as const;
//
// const STEPS = [
//   {
//     number: '01',
//     title: 'Настройка',
//     description: 'Указываются адрес портала и серверные данные авторизации.',
//     icon: Settings2,
//   },
//   {
//     number: '02',
//     title: 'Запуск',
//     description: 'Оператор запускает автоматизацию из панели управления.',
//     icon: Play,
//   },
//   {
//     number: '03',
//     title: 'Обработка',
//     description:
//       'Система авторизуется, применяет фильтры и находит нужные заявки.',
//     icon: ListChecks,
//   },
//   {
//     number: '04',
//     title: 'Результат',
//     description: 'Логи и статистика позволяют проверить выполнение сценария.',
//     icon: CheckCircle,
//   },
// ] as const;

export const Landing = () => {
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

          <nav
            className="landing-navigation"
            aria-label="Основная конфигурация"
          >
            <a href="#features">Возможности</a>

            <a href="#benefits">Преимущества</a>

            <a href="#workflow">Как это работает</a>

            <a href="#about">О проекте</a>
          </nav>

          <Link className="landing-header-action" to="/dashboard">
            Перейти в панель
            {/*<ArrowRight size={17} />*/}
          </Link>
        </div>
      </header>
    </div>
  );
};
