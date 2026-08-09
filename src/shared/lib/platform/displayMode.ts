type AppleNavigator = Navigator & {
  standalone?: boolean;
};

export type AppDisplayMode = 'browser' | 'standalone';

export function getAppDisplayMode(): AppDisplayMode {
  const matchesStandaloneMedia = window.matchMedia(
    '(display-mode: standalone)'
  ).matches;
  const isAppleStandalone =
    (window.navigator as AppleNavigator).standalone === true;

  return matchesStandaloneMedia || isAppleStandalone ? 'standalone' : 'browser';
}

export function syncAppDisplayMode(): AppDisplayMode {
  const displayMode = getAppDisplayMode();

  document.documentElement.dataset.displayMode = displayMode;

  return displayMode;
}
