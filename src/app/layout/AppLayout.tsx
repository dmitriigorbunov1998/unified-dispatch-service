import type { ReactNode } from 'react';

import { HeaderContainer } from '@/widgets/Header/HeaderContainer';

import './AppLayout.css';

interface AppLayoutProps {
  onLogout?: () => void;
  children: ReactNode;
}

export function AppLayout({ onLogout, children }: AppLayoutProps) {
  return (
    <div className="app">
      <HeaderContainer onLogout={onLogout} />

      <main className="app-main">{children}</main>
    </div>
  );
}
