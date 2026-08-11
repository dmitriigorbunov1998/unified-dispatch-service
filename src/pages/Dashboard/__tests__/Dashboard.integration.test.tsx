import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import { I18nProvider } from '@/shared/config/i18n';
import { DashboardContainer } from '../DashboardContainer';

const wrapper = ({ children }: { children: ReactNode }) => (
  <I18nProvider>{children}</I18nProvider>
);

describe('Dashboard', () => {
  it('renders initial dashboard state', () => {
    render(<DashboardContainer />, { wrapper });

    expect(
      screen.getByRole('heading', {
        name: /панель автоматизации/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /запустить скрипт/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText('Логи пока отсутствуют')).toBeInTheDocument();
  });
});
