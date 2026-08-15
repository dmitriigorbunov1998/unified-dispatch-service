import type { ResolvedTheme, Theme } from '@/shared/theme';

export function syncBrowserTheme(
  theme: Theme,
  resolvedTheme: ResolvedTheme
): () => void {
  document.documentElement.dataset.theme = theme;
  document.body.style.backgroundColor = 'transparent';

  document
    .querySelector<HTMLMetaElement>(
      'meta[name="apple-mobile-web-app-status-bar-style"]'
    )
    ?.setAttribute(
      'content',
      resolvedTheme === 'dark' ? 'black-translucent' : 'default'
    );

  const desktopMedia = window.matchMedia('(min-width: 769px)');
  const syncCanvas = () => {
    const existingMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );

    if (!desktopMedia.matches) {
      document.documentElement.style.backgroundColor = 'transparent';
      existingMeta?.remove();
      return;
    }

    const color = resolvedTheme === 'dark' ? '#000000' : '#ffffff';
    document.documentElement.style.backgroundColor = color;

    const meta = existingMeta ?? document.createElement('meta');
    meta.id = 'browser-theme-color';
    meta.name = 'theme-color';
    meta.content = color;
    meta.media = '(min-width: 769px)';
    if (!existingMeta) document.head.append(meta);
  };

  syncCanvas();
  desktopMedia.addEventListener('change', syncCanvas);
  return () => desktopMedia.removeEventListener('change', syncCanvas);
}
