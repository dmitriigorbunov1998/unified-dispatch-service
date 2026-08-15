import { act, renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { server } from '@/test/mocks/server';
import { useAutomation } from '../useAutomation';

const messages = {
  clearError: 'Unable to clear logs',
  startError: 'Unable to start',
  statusError: 'Unable to load status',
};

describe('useAutomation', () => {
  it('loads status, starts automation and clears logs', async () => {
    let logs = ['Loaded'];
    let isRunning = false;

    server.use(
      http.get('/api/automation/status', () =>
        HttpResponse.json({ isRunning, logs })
      ),
      http.post('/api/automation/start', () => {
        logs = ['Started'];
        isRunning = true;
        return HttpResponse.json({ message: 'Started' }, { status: 202 });
      }),
      http.delete('/api/automation/logs', () => {
        logs = [];
        return HttpResponse.json({ message: 'Cleared' });
      })
    );

    const { result } = renderHook(() => useAutomation(messages));
    await waitFor(() => expect(result.current.logs).toEqual(['Loaded']));

    await act(() => result.current.start());
    expect(result.current.isRunning).toBe(true);
    expect(result.current.logs).toEqual(['Started']);

    await act(() => result.current.clearLogs());
    expect(result.current.logs).toEqual([]);
  });

  it('exposes a translated status error', async () => {
    server.use(
      http.get('/api/automation/status', () =>
        HttpResponse.json({ message: 'Failed' }, { status: 500 })
      )
    );

    const { result } = renderHook(() => useAutomation(messages));
    await waitFor(() => expect(result.current.error).toBe('Failed'));
    expect(result.current.isRunning).toBe(false);
  });
});
