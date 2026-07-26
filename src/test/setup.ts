import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { server } from '@/test/mocks/server.ts';

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

const localStorageMock = {
  store: {} as Record<string, string>,

  getItem(key: string): string | null {
    return this.store[key] ?? null;
  },

  setItem(key: string, value: string): void {
    this.store[key] = value;
  },

  removeItem(key: string): void {
    delete this.store[key];
  },

  clear(): void {
    this.store = {};
  },
};

Object.defineProperty(window, 'localStorage', {
  configurable: true,
  value: localStorageMock,
});

Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
  configurable: true,
  writable: true,
  value: vi.fn(),
});
