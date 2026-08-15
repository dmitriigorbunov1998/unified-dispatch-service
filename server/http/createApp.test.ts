import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import { http, passthrough } from 'msw';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { server as mockServer } from '../../src/test/mocks/server';
import { AutomationService } from '../automation/AutomationService';
import { createApp } from './createApp';

const openServers: Server[] = [];

beforeEach(() => {
  mockServer.use(
    http.all(/http:\/\/127\.0\.0\.1:\d+\/.*/, () => passthrough())
  );
});

afterEach(async () => {
  await Promise.all(
    openServers.splice(0).map(
      (server) =>
        new Promise<void>((resolve, reject) => {
          server.close((error) => (error ? reject(error) : resolve()));
        })
    )
  );
  vi.restoreAllMocks();
});

function listen(service: AutomationService): string {
  const app = createApp({
    automationService: service,
    allowedOrigins: ['https://uds.test'],
  });
  const server = app.listen(0);
  openServers.push(server);
  const { port } = server.address() as AddressInfo;
  return `http://127.0.0.1:${port}`;
}

describe('createApp', () => {
  it('serves health and does not expose Express metadata', async () => {
    const baseUrl = listen(new AutomationService(async () => undefined));
    const response = await fetch(`${baseUrl}/api/health`);

    expect(response.status).toBe(200);
    expect(response.headers.get('x-powered-by')).toBeNull();
    await expect(response.json()).resolves.toEqual({
      message: 'Сервер работает',
    });
  });

  it('starts one automation at a time and clears logs', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    let finishAutomation: () => void = () => undefined;
    const runner = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finishAutomation = resolve;
        })
    );
    const baseUrl = listen(new AutomationService(runner));
    const request = { method: 'POST', headers: { Origin: 'https://uds.test' } };

    const firstStart = await fetch(`${baseUrl}/api/automation/start`, request);
    const secondStart = await fetch(`${baseUrl}/api/automation/start`, request);

    expect(firstStart.status).toBe(202);
    expect(secondStart.status).toBe(409);
    expect(firstStart.headers.get('access-control-allow-origin')).toBe(
      'https://uds.test'
    );

    const status = await fetch(`${baseUrl}/api/automation/status`).then(
      (response) => response.json()
    );
    expect(status.isRunning).toBe(true);
    expect(status.logs).toHaveLength(1);

    const clearResponse = await fetch(`${baseUrl}/api/automation/logs`, {
      method: 'DELETE',
    });
    expect(clearResponse.status).toBe(200);
    const clearedStatus = await fetch(`${baseUrl}/api/automation/status`).then(
      (response) => response.json()
    );
    expect(clearedStatus.logs).toEqual([]);

    finishAutomation();
  });

  it('rejects browser origins outside the allowlist', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const baseUrl = listen(new AutomationService(async () => undefined));
    const response = await fetch(`${baseUrl}/api/health`, {
      headers: { Origin: 'https://attacker.test' },
    });

    expect(response.status).toBe(500);
    expect(response.headers.get('access-control-allow-origin')).toBeNull();
  });
});
