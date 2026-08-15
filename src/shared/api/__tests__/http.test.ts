import { afterEach, describe, expect, it, vi } from 'vitest';

import { requestJson } from '../http';

describe('requestJson', () => {
  afterEach(() => vi.restoreAllMocks());

  it('returns parsed JSON', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    );

    await expect(requestJson<{ ok: boolean }>('/api/test')).resolves.toEqual({
      ok: true,
    });
  });

  it('preserves an API error message', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ message: 'Request failed' }), {
        status: 409,
        statusText: 'Conflict',
        headers: { 'content-type': 'application/json' },
      })
    );

    await expect(requestJson('/api/test')).rejects.toEqual(
      expect.objectContaining({
        name: 'HttpError',
        message: 'Request failed',
        status: 409,
      })
    );
  });

  it('rejects an HTML fallback instead of casting it as JSON', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('<html />', {
        status: 200,
        headers: { 'content-type': 'text/html' },
      })
    );

    await expect(requestJson('/api/test')).rejects.toThrow(
      'Server returned a non-JSON response'
    );
  });
});
