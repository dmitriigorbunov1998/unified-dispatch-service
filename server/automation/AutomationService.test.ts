import { describe, expect, it, vi } from 'vitest';

import { AutomationService } from './AutomationService';

describe('AutomationService', () => {
  it('prevents concurrent runs and exposes an immutable status snapshot', async () => {
    let finish: (() => void) | undefined;
    const runner = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finish = resolve;
        })
    );
    const service = new AutomationService(
      runner,
      () => new Date('2026-01-01T10:00:00Z')
    );

    expect(service.start()).toBe(true);
    expect(service.start()).toBe(false);
    const status = service.getStatus();
    expect(status.isRunning).toBe(true);
    expect(status.logs[0]).toContain('Получен запрос');

    status.logs.length = 0;
    expect(service.getStatus().logs).toHaveLength(1);

    finish?.();
    await vi.waitFor(() => expect(service.getStatus().isRunning).toBe(false));
  });
});
