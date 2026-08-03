import githubIcon from '@/assets/logo/GitHub.png';

import telegramIcon from '@/assets/logo/Telegram.webp';

import './Home.css';

const FOOTER_SECTIONS = [
  {
    title: 'Продукт',
    links: ['Возможности', 'Как это работает', 'Цены'],
  },
  {
    title: 'Компания',
    links: ['О нас', 'Контакты', 'Документация'],
  },
  {
    title: 'Поддержка',
    links: ['Помощь', 'FAQ', 'Обратная связь'],
  },
];

export const Home = () => {
  return (
    <div className="app">
      <main className="app-main">{/* Содержимое страницы */}</main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-title">EDS Manager</div>

            <p className="footer-subtitle">
              Автоматизация обработки заявок в Единой диспетчерской службе.
            </p>

            <div className="footer-icons">
              <a href="#" aria-label="Telegram" className="footer-social-link">
                <img src={telegramIcon} alt="" />
              </a>

              <a href="#" aria-label="GitHub" className="footer-social-link">
                <img src={githubIcon} alt="" />
              </a>
            </div>
          </div>

          <nav className="footer-navigation" aria-label="Навигация в подвале">
            {FOOTER_SECTIONS.map((section) => (
              <div className="footer-section" key={section.title}>
                <h3 className="footer-section-title">{section.title}</h3>

                <ul className="footer-links">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <span>© 2026 EDS Manager. Все права защищены.</span>
        </div>
      </footer>
    </div>
  );
};
