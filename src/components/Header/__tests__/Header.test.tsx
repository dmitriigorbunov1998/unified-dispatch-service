import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Activity, Monitor, Moon, Settings, Sun } from 'lucide-react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Header } from '../Header';
import type { HeaderProps } from '../Header.types';

const callbacks = {
  onTabChange: vi.fn(),
  onToggleLang: vi.fn(),
  onToggleThemeMenu: vi.fn(),
  onSelectTheme: vi.fn(),
  onLogout: vi.fn(),
};

const defaultProps: HeaderProps = {
  activeTab: 'dashboard',

  tabs: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      title: 'Dashboard',
      icon: Activity,
    },
    {
      id: 'config',
      label: 'Settings',
      title: 'Settings',
      icon: Settings,
    },
  ],

  lang: 'ru',
  theme: 'light',
  themeMenuOpen: false,

  ThemeIcon: Sun,

  themeOptions: [
    {
      value: 'light',
      label: 'Light',
      icon: Sun,
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: Moon,
    },
    {
      value: 'system',
      label: 'System',
      icon: Monitor,
    },
  ],

  themeMenuRef: { current: null },

  t: (key) => key,

  ...callbacks,
};

afterEach(() => {
  vi.clearAllMocks();
});

describe('Header', () => {
  it('renders tabs and current language', () => {
    render(<Header {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: 'Dashboard' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Settings' })
    ).toBeInTheDocument();

    expect(screen.getByTestId('header-language-toggle')).toHaveTextContent(
      'RU'
    );
  });

  it('marks current tab as active', () => {
    render(<Header {...defaultProps} activeTab="config" />);

    expect(screen.getByTestId('header-tab-config')).toHaveAttribute(
      'aria-current',
      'page'
    );

    expect(screen.getByTestId('header-tab-dashboard')).not.toHaveAttribute(
      'aria-current'
    );
  });

  it('calls onTabChange with selected tab id', async () => {
    const user = userEvent.setup();

    render(<Header {...defaultProps} />);

    await user.click(screen.getByTestId('header-tab-config'));

    expect(callbacks.onTabChange).toHaveBeenCalledOnce();
    expect(callbacks.onTabChange).toHaveBeenCalledWith('config');
  });

  it('calls language handler', async () => {
    const user = userEvent.setup();

    render(<Header {...defaultProps} />);

    await user.click(screen.getByTestId('header-language-toggle'));

    expect(callbacks.onToggleLang).toHaveBeenCalledOnce();
  });

  it('calls theme menu handler', async () => {
    const user = userEvent.setup();

    render(<Header {...defaultProps} />);

    await user.click(screen.getByTestId('header-theme-toggle'));

    expect(callbacks.onToggleThemeMenu).toHaveBeenCalledOnce();
  });

  it('renders and selects theme option', async () => {
    const user = userEvent.setup();

    render(<Header {...defaultProps} themeMenuOpen />);

    const darkOption = screen.getByTestId('header-theme-option-dark');

    expect(darkOption).toBeInTheDocument();

    await user.click(darkOption);

    expect(callbacks.onSelectTheme).toHaveBeenCalledOnce();
    expect(callbacks.onSelectTheme).toHaveBeenCalledWith('dark');
  });

  it('marks selected theme', () => {
    render(<Header {...defaultProps} theme="dark" themeMenuOpen />);

    expect(screen.getByTestId('header-theme-option-dark')).toHaveAttribute(
      'aria-checked',
      'true'
    );
  });

  it('calls logout handler', async () => {
    const user = userEvent.setup();

    render(<Header {...defaultProps} />);

    await user.click(
      screen.getByRole('button', {
        name: 'logout.title',
      })
    );

    expect(callbacks.onLogout).toHaveBeenCalledOnce();
  });
});
