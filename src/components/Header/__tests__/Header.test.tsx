import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';
import { Sun, Moon, Monitor, Activity, Settings } from 'lucide-react';
import { expect, it, describe, vi } from 'vitest';
import type { Theme } from '@shared/theme/types.ts';

const mockProps = {
  activeTab: 'dashboard',
  tabs: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      title: 'Dashboard',
      icon: Activity,
    },
    {
      id: 'settings',
      label: 'Settings',
      title: 'Settings',
      icon: Settings,
    },
  ],
  themeOptions: [
    { value: 'light' as Theme, label: 'Light', icon: Sun },
    { value: 'dark' as Theme, label: 'Dark', icon: Moon },
    { value: 'system' as Theme, label: 'System', icon: Monitor },
  ],
  ThemeIcon: Sun,
  theme: 'light',
  themeMenuOpen: false,
  lang: 'ru',
  menuRef: { current: null },
  onTabChange: vi.fn(),
  onToggleLang: vi.fn(),
  onToggleThemeMenu: vi.fn(),
  onSelectTheme: vi.fn(),
  t: (key: string) => key,
};

describe('Header Component', () => {
  it('should render without crashing', () => {
    render(<Header {...mockProps} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should call onTabChange when tab clicked', () => {
    const onTabChange = vi.fn(); // Создаем фейковую функцию
    render(<Header {...mockProps} onTabChange={onTabChange} />);

    fireEvent.click(screen.getByText('Settings'));
    expect(onTabChange).toHaveBeenCalledWith('settings');
  });

  it('should highlight active tab', () => {
    const { rerender } = render(
      <Header {...mockProps} activeTab="dashboard" />
    );
    const dashboardTab = screen.getByText('Dashboard').closest('button');
    expect(dashboardTab).toHaveClass('active');

    rerender(<Header {...mockProps} activeTab="settings" />);
    const settingsTab = screen.getByText('Settings').closest('button');
    expect(settingsTab).toHaveClass('active');
  });

  it('should toggle language on button click', () => {
    const onToggleLang = vi.fn();
    render(<Header {...mockProps} onToggleLang={onToggleLang} />);

    const langButton = screen.getByText('RU');
    fireEvent.click(langButton);
    expect(onToggleLang).toHaveBeenCalled();
  });

  it('should show theme dropdown when menu opened', () => {
    render(<Header {...mockProps} themeMenuOpen={true} />);

    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  it('should call onSelectTheme when theme option clicked', () => {
    const onSelectTheme = vi.fn();
    render(
      <Header
        {...mockProps}
        themeMenuOpen={true}
        onSelectTheme={onSelectTheme}
      />
    );

    fireEvent.click(screen.getByText('Dark'));
    expect(onSelectTheme).toHaveBeenCalledWith('dark');
  });
});
