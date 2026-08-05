import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DashboardContainer } from '../DashboardContainer';

describe('Dashboard', () => {
  it('renders initial dashboard state', () => {
    render(<DashboardContainer />);

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
