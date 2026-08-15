import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';

import type { HeaderProps } from '../Header.types';

type ThemeMenuProps = Pick<
  HeaderProps,
  | 'theme'
  | 'themeMenuOpen'
  | 'themeMenuClosing'
  | 'themeMenuDragging'
  | 'themeMenuDragOffset'
  | 'themeOptions'
  | 'onToggleThemeMenu'
  | 'onSelectTheme'
  | 't'
>;

export function ThemeMenu({
  theme,
  themeMenuOpen,
  themeMenuClosing,
  themeMenuDragging,
  themeMenuDragOffset,
  themeOptions,
  onToggleThemeMenu,
  onSelectTheme,
  t,
}: ThemeMenuProps) {
  if (!themeMenuOpen) return null;

  const styles = {
    '--theme-sheet-drag-offset': `${themeMenuDragOffset}px`,
  } as CSSProperties;

  return createPortal(
    <div className="header-theme-layer">
      <button
        type="button"
        className="header-theme-backdrop"
        aria-label={t('theme.close')}
        onClick={onToggleThemeMenu}
      />

      <div
        className={`header-theme-menu${themeMenuDragging ? ' dragging' : ''}${
          themeMenuClosing ? ' closing' : ''
        }`}
        role="menu"
        aria-label={t('theme.select')}
        style={styles}
      >
        <div className="header-theme-menu-handle" />
        <div className="header-theme-menu-title">{t('theme.select')}</div>

        {themeOptions.map(({ value, label, icon: OptionIcon }) => {
          const isSelected = theme === value;

          return (
            <button
              key={value}
              type="button"
              role="menuitemradio"
              aria-checked={isSelected}
              className={`header-theme-option ${isSelected ? 'active' : ''}`}
              data-testid={`header-theme-option-${value}`}
              onClick={() => onSelectTheme(value)}
            >
              <OptionIcon size={18} aria-hidden="true" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>,
    document.body
  );
}
