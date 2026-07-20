import type { ReactNode } from 'react';
import { EffectorProvider } from './effector-provider';
import { ThemeProvider } from '@/context/ThemeProvider';

interface Props {
  children: ReactNode;
}

export function AppProviders({ children }: Props) {
  return (
    <EffectorProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </EffectorProvider>
  );
}
