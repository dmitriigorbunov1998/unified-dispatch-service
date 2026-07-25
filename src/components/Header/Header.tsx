import { Globe, LogOut } from 'lucide-react';

import type { HeaderProps } from './Header.types';

import './Header.css';

export function Header({
  activeTab,
  tabs,
  lang,
  theme,
  themeMenuOpen,
  themeOptions,
  ThemeIcon,
  onTabChange,
  onToggleLang,
  onToggleThemeMenu,
  onSelectTheme,
  onLogout,
  themeMenuRef,
  t,
}: HeaderProps) {
  return (
    <div className="header-wrapper">
      <div className="header-background" aria-hidden="true" />
      <div className="header-border" aria-hidden="true" />

      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <div className="header-logo" aria-hidden="true">
              E
            </div>

            <div className="header-brand">
              <div className="header-title">{t('app.title')}</div>
              <div className="header-subtitle">{t('app.subtitle')}</div>
            </div>

            <div className="header-status">
              <span className="header-status-dot" aria-hidden="true" />
              <span className="header-status-text">{t('status.title')}</span>
            </div>
          </div>

          <nav className="header-navigation" aria-label={t('nav.title')}>
            {tabs.map(({ id, label, title, icon: TabIcon }) => {
              const isActive = activeTab === id;

              return (
                <button
                  key={id}
                  type="button"
                  className={`header-tab ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  data-testid={`header-tab-${id}`}
                  title={title}
                  onClick={() => onTabChange(id)}
                >
                  <TabIcon size={16} aria-hidden="true" />
                  <span className="header-tab-label">{label}</span>
                </button>
              );
            })}
          </nav>

          <div className="header-actions">
            <div className="header-user">
              <div className="header-avatar" aria-hidden="true">
                ДГ
              </div>

              <span className="header-user-name">Дмитрий Горбунов</span>
            </div>

            <button
              type="button"
              className="header-button header-language-button"
              aria-label={t('lang.toggle')}
              data-testid="header-language-toggle"
              title={t('lang.toggle')}
              onClick={onToggleLang}
            >
              <Globe size={18} aria-hidden="true" />

              <span className="header-language-label">
                {lang.toUpperCase()}
              </span>
            </button>

            <div className="header-theme" ref={themeMenuRef}>
              <button
                type="button"
                className="header-button"
                aria-label={t('theme.select')}
                aria-haspopup="menu"
                aria-expanded={themeMenuOpen}
                data-testid="header-theme-toggle"
                title={t('theme.select')}
                onClick={onToggleThemeMenu}
              >
                <ThemeIcon size={18} aria-hidden="true" />
              </button>

              {themeMenuOpen && (
                <div
                  className="header-theme-menu"
                  role="menu"
                  aria-label={t('theme.select')}
                >
                  {themeOptions.map(({ value, label, icon: OptionIcon }) => {
                    const isSelected = theme === value;

                    return (
                      <button
                        key={value}
                        type="button"
                        role="menuitemradio"
                        aria-checked={isSelected}
                        className={`header-theme-option ${
                          isSelected ? 'active' : ''
                        }`}
                        data-testid={`header-theme-option-${value}`}
                        onClick={() => onSelectTheme(value)}
                      >
                        <OptionIcon size={16} aria-hidden="true" />

                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="button"
              className="header-button header-logout-button"
              aria-label={t('logout.title')}
              title={t('logout.title')}
              onClick={onLogout}
            >
              <LogOut size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
