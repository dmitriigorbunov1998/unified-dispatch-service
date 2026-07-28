import { HeaderContainer } from '@/widgets/Header/HeaderContainer';

import './AppLayout.css';

import { Outlet } from 'react-router-dom';

interface AppLayoutProps {
  onLogout?: () => void;
}

export function AppLayout({ onLogout }: AppLayoutProps) {
  return (
    <div className="app">
      <HeaderContainer onLogout={onLogout} />

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
