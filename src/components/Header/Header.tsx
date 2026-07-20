import { Globe, LogOut } from 'lucide-react';
import type { Tab } from '../../hooks/useTabs';
import type { LucideIcon } from 'lucide-react';
import './Header.css';
import type { Theme } from '@shared/utils/types';
import * as React from 'react';

interface ThemeOptionWithLabel {
  value: Theme;
  label: string;
  icon: LucideIcon;
}

interface HeaderProps {
  /* Данные */
  activeTab: string;
  tabs: Tab[];
  themeOptions: ThemeOptionWithLabel[];
  ThemeIcon: LucideIcon;

  /* Состояние */
  theme: string;
  themeMenuOpen: boolean;
  lang: string;
  /* Refs */
  menuRef: React.RefObject<HTMLDivElement | null>;

  /* Действия */
  onTabChange: (tab: string) => void;
  onToggleLang: () => void;
  onToggleThemeMenu: () => void;
  onSelectTheme: (theme: Theme) => void;

  /* Переводы */
  t: (key: string) => string;
}

export function Header({
  activeTab,
  tabs,
  themeOptions,
  ThemeIcon,
  theme,
  themeMenuOpen,
  lang,
  menuRef,
  onTabChange,
  onToggleLang,
  onToggleThemeMenu,
  onSelectTheme,
  t,
}: HeaderProps) {
  return (
    <div className="header-wrapper">
      {/* Semi-transparent dark overlay that also fades */}
      <div className="progressive-blur-bg" />

      {/* Subtle border at the header bottom */}
      <div className="progressive-blur-border" />

      {/* Actual header content */}
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <div className="header-logo">
              <span>E</span>
            </div>
            <div className="header-brand">
              <div className="header-title">{t('app.title')}</div>
              <div className="header-subtitle">{t('app.subtitle')}</div>
            </div>
            <div className="header-status">
              <div className="header-status-dot" />
              <span className="header-status-text">{t('status.title')}</span>
            </div>
          </div>

          {/* Navigation tabs — transforms into Row 2 without background on mobile (< 768px) */}
          <nav className="header-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`header-tab ${activeTab === tab.id ? 'active' : ''}`}
                title={tab.title}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="header-right">
            <div className="header-user">
              <div className="header-avatar">ДГ</div>
              <span className="header-user-name">Дмитрий Горбунов</span>
            </div>

            <button
              className="header-btn"
              onClick={onToggleLang}
              title={t('lang.toggle')}
            >
              <Globe size={18} />
              <span>{lang === 'ru' ? 'RU' : 'EN'}</span>
            </button>

            <div className="header-theme-menu" ref={menuRef}>
              <button
                className="header-btn"
                onClick={onToggleThemeMenu}
                title={t('theme.select')}
              >
                <ThemeIcon size={18} />
              </button>

              {themeMenuOpen && (
                <div className="header-theme-dropdown">
                  {themeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      className={`header-theme-option ${theme === opt.value ? 'active' : ''}`}
                      onClick={() => onSelectTheme(opt.value)}
                    >
                      <opt.icon size={16} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="header-btn danger" title={t('logout.title')}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
