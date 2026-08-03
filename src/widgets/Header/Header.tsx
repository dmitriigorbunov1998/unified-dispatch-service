import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { Globe, LogOut, Search, X } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchAreaRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const activeTabIndex = Math.max(
    tabs.findIndex((tab) => tab.id === activeTab),
    0
  );

  const navigationStyles = {
    '--active-tab-index': activeTabIndex,
    '--tabs-count': tabs.length,
  } as CSSProperties;

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredTabs = useMemo(() => {
    if (!normalizedSearchQuery) {
      return tabs;
    }

    return tabs.filter((tab) => {
      const searchableText = [tab.id, tab.label, tab.title]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedSearchQuery);
    });
  }, [normalizedSearchQuery, tabs]);

  const shouldShowSearchDropdown =
    isSearchOpen && normalizedSearchQuery.length > 0;

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!searchAreaRef.current?.contains(target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  const handleSearchClear = () => {
    setSearchQuery('');
    setIsSearchOpen(false);

    searchInputRef.current?.focus();
  };

  const handleSearchResultClick = (tabId: string) => {
    onTabChange(tabId);

    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();

      setSearchQuery('');
      setIsSearchOpen(false);

      event.currentTarget.blur();

      return;
    }

    if (
      event.key === 'Enter' &&
      normalizedSearchQuery &&
      filteredTabs.length === 1
    ) {
      event.preventDefault();

      handleSearchResultClick(filteredTabs[0].id);
    }
  };

  return (
    <div className="header-wrapper">
      <div className="header-background" />
      <div className="header-border" />

      <header className="header">
        <div className="header-inner">
          <div ref={searchAreaRef} className="header-search-area">
            <div className="global-search">
              <Search
                className="global-search__search-icon"
                size={19}
                aria-hidden="true"
              />

              <input
                ref={searchInputRef}
                type="search"
                className="global-search__input"
                value={searchQuery}
                placeholder="Поиск разделов и заявок..."
                aria-label="Поиск разделов и заявок"
                aria-autocomplete="list"
                aria-controls="global-search-results"
                aria-expanded={shouldShowSearchDropdown}
                autoComplete="off"
                spellCheck={false}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => {
                  if (normalizedSearchQuery) {
                    setIsSearchOpen(true);
                  }
                }}
                onKeyDown={handleSearchKeyDown}
              />

              <div className="global-search__actions">
                {searchQuery.length > 0 && (
                  <button
                    type="button"
                    className="header-button global-search__clear-button"
                    aria-label="Очистить поиск"
                    title="Очистить поиск"
                    onClick={handleSearchClear}
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

                    {themeMenuOpen && (
                      <div
                        className="header-theme-menu"
                        role="menu"
                        aria-label={t('theme.select')}
                      >
                        {themeOptions.map(
                          ({ value, label, icon: OptionIcon }) => {
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
                          }
                        )}
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
            </div>

            {shouldShowSearchDropdown && (
              <div
                id="global-search-results"
                className="global-search__dropdown"
                role="listbox"
                aria-label="Результаты поиска"
              >
                <section className="global-search__group">
                  <div className="global-search__group-header">
                    <span className="global-search__group-title">Разделы</span>

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
                              onClick={() => handleSearchResultClick(id)}
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
                                  Открыто
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
                        Ничего не найдено
                      </span>

                      <span className="global-search__empty-description">
                        Попробуйте изменить поисковый запрос
                      </span>
                    </div>
                  )}
                </section>

                <section className="global-search__group">
                  <div className="global-search__group-header">
                    <span className="global-search__group-title">Заявки</span>

                    <span className="global-search__group-badge">Скоро</span>
                  </div>

                  <div className="global-search__requests-placeholder">
                    Поиск по номеру, району, адресу и статусу заявки появится
                    после подключения базы данных.
                  </div>
                </section>
              </div>
            )}
          </div>

          <nav
            className="header-navigation"
            aria-label={t('nav.title')}
            style={navigationStyles}
          >
            <span className="header-tab-indicator" aria-hidden="true" />

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
        </div>
      </header>
    </div>
  );
}
