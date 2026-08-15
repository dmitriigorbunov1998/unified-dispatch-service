import type { CSSProperties } from 'react';

import type { HeaderProps } from '../Header.types';

type HeaderNavigationProps = Pick<
  HeaderProps,
  'activeTab' | 'tabs' | 'onTabChange' | 't'
>;

export function HeaderNavigation({
  activeTab,
  tabs,
  onTabChange,
  t,
}: HeaderNavigationProps) {
  const activeTabIndex = Math.max(
    tabs.findIndex((tab) => tab.id === activeTab),
    0
  );
  const styles = {
    '--active-tab-index': activeTabIndex,
    '--tabs-count': tabs.length,
  } as CSSProperties;

  return (
    <nav
      className="header-navigation"
      aria-label={t('nav.title')}
      style={styles}
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
  );
}
