import { HeaderContainer } from '@/widgets/Header';
import { FooterContainer } from '@/widgets/Footer';
import { Outlet } from 'react-router-dom';
import './AppLayout.css';

export function AppLayout() {
  return (
    <div className="app">
      <HeaderContainer />

      <main className="app-main app-content-width">
        <Outlet />
      </main>

      <div className="app-footer app-content-width">
        <FooterContainer />
      </div>
    </div>
  );
}
