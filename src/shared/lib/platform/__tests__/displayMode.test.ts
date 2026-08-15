import { afterEach, describe, expect, it, vi } from 'vitest';

import { getAppDisplayMode, syncAppDisplayMode } from '../displayMode';

function setDisplayModeMedia(matches: boolean) {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches }));
}

function setAppleStandalone(value: boolean) {
  Object.defineProperty(window.navigator, 'standalone', {
    configurable: true,
    value,
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
  delete document.documentElement.dataset.displayMode;
  Reflect.deleteProperty(window.navigator, 'standalone');
});

describe('display mode', () => {
  it('detects the standard standalone media mode', () => {
    setDisplayModeMedia(true);
    setAppleStandalone(false);

    expect(getAppDisplayMode()).toBe('standalone');
  });

  it('uses the Apple standalone fallback', () => {
    setDisplayModeMedia(false);
    setAppleStandalone(true);

    expect(syncAppDisplayMode()).toBe('standalone');
    expect(document.documentElement.dataset.displayMode).toBe('standalone');
  });

  it('keeps regular Safari in browser mode', () => {
    setDisplayModeMedia(false);
    setAppleStandalone(false);

    expect(getAppDisplayMode()).toBe('browser');
  });
});
