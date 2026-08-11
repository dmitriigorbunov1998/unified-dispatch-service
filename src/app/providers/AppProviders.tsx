import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { I18nProvider } from '@/shared/config/i18n';
import { ThemeProvider } from './ThemeProvider.tsx';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <I18nProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </I18nProvider>
    </BrowserRouter>
  );
}
