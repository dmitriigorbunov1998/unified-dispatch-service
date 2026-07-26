import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from './ThemeProvider.tsx';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <ThemeProvider>{children}</ThemeProvider>
    </BrowserRouter>
  );
}
