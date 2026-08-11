import { Globe, LogOut, Search, X } from 'lucide-react';

import type { HeaderProps } from './Header.types';
import { HeaderNavigation } from './ui/HeaderNavigation';
import { ThemeMenu } from './ui/ThemeMenu';

import './Header.css';

export function Header({
  activeTab,
  tabs,
  lang,
  theme,
  themeMenuOpen,
  themeMenuClosing,
  themeMenuDragging,
  themeMenuDragOffset,
  themeOptions,
  ThemeIcon,
  onTabChange,
  onToggleLang,
  onToggleThemeMenu,
  onSelectTheme,
  onLogout,
  themeMenuRef,
  filteredTabs,
  query,
  searchAreaRef,
  searchInputRef,
  shouldShowDropdown,
  onClear,
  onFocus,
  onKeyDown,
  onQueryChange,
  onSelectResult,
  t,
}: HeaderProps) {
  return (
    <>
      <div className="header-wrapper">
        <header className="header">
          <div className="header-inner app-content-width">
            <div ref={searchAreaRef} className="header-search-area">
              <div
                className={`global-search ${query.length > 0 ? 'has-query' : ''}`}
              >
                <Search
                  className="global-search__search-icon"
                  size={19}
                  aria-hidden="true"
                />

                <input
                  ref={searchInputRef}
                  type="search"
                  className="global-search__input"
                  value={query}
                  placeholder={t('search.placeholder')}
                  aria-label={t('search.label')}
                  aria-autocomplete="list"
                  aria-controls="global-search-results"
                  aria-expanded={shouldShowDropdown}
                  autoComplete="off"
                  spellCheck={false}
                  onChange={(event) => onQueryChange(event.target.value)}
                  onFocus={onFocus}
                  onKeyDown={onKeyDown}
                />

                <div className="global-search__actions">
                  {query.length > 0 && (
                    <button
                      type="button"
                      className="header-button global-search__clear-button"
                      aria-label={t('search.clear')}
                      title={t('search.clear')}
                      onClick={onClear}
                    >
                      <X size={18} aria-hidden="true" />
                    </button>
                  )}

                  <div className="header-actions">
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
                    </div>

                    <button
                      type="button"
                      className="header-button header-logout-button"
                      aria-label={t('logout.title')}
                      title={t('logout.title')}
                      onClick={() => onLogout?.()}
                    >
                      <LogOut size={18} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              {shouldShowDropdown && (
                <div
                  id="global-search-results"
                  className="global-search__dropdown"
                  role="listbox"
                  aria-label={t('search.results')}
                >
                  <section className="global-search__group">
                    <div className="global-search__group-header">
                      <span className="global-search__group-title">
                        {t('search.sections')}
                      </span>

                      <span className="global-search__group-count">
                        {filteredTabs.length}
                      </span>
                    </div>

                    {filteredTabs.length > 0 ? (
                      <div className="global-search__results">
                        {filteredTabs.map(
                          ({ id, label, title, icon: ResultIcon }) => {
                            const isActive = activeTab === id;

                            return (
                              <button
                                key={id}
                                type="button"
                                className={`global-search__result ${
                                  isActive ? 'active' : ''
                                }`}
                                role="option"
                                aria-selected={isActive}
                                onClick={() => onSelectResult(id)}
                              >
                                <span className="global-search__result-icon">
                                  <ResultIcon size={18} aria-hidden="true" />
                                </span>

                                <span className="global-search__result-content">
                                  <span className="global-search__result-title">
                                    {label}
                                  </span>

                                  <span className="global-search__result-description">
                                    {title}
                                  </span>
                                </span>

                                {isActive && (
                                  <span className="global-search__result-status">
                                    {t('search.open')}
                                  </span>
                                )}
                              </button>
                            );
                          }
                        )}
                      </div>
                    ) : (
                      <div className="global-search__empty">
                        <Search size={22} aria-hidden="true" />

                        <span className="global-search__empty-title">
                          {t('search.emptyTitle')}
                        </span>

                        <span className="global-search__empty-description">
                          {t('search.emptyDescription')}
                        </span>
                      </div>
                    )}
                  </section>

                  <section className="global-search__group">
                    <div className="global-search__group-header">
                      <span className="global-search__group-title">
                        {t('search.requests')}
                      </span>

                      <span className="global-search__group-badge">
                        {t('search.soon')}
                      </span>
                    </div>

                    <div className="global-search__requests-placeholder">
                      {t('search.requestsPlaceholder')}
                    </div>
                  </section>
                </div>
              )}
            </div>

            <HeaderNavigation
              activeTab={activeTab}
              tabs={tabs}
              onTabChange={onTabChange}
              t={t}
            />
          </div>
        </header>
      </div>

      <ThemeMenu
        theme={theme}
        themeMenuOpen={themeMenuOpen}
        themeMenuClosing={themeMenuClosing}
        themeMenuDragging={themeMenuDragging}
        themeMenuDragOffset={themeMenuDragOffset}
        themeOptions={themeOptions}
        onToggleThemeMenu={onToggleThemeMenu}
        onSelectTheme={onSelectTheme}
        t={t}
      />
    </>
  );
}
