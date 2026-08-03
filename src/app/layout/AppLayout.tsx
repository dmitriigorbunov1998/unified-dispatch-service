import { HeaderContainer } from '@/widgets/Header/HeaderContainer';
import { Outlet } from 'react-router-dom';
import './AppLayout.css';

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
