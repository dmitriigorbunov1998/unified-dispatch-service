import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AppProviders } from './app/providers/index.tsx';

// Set initial theme before React renders (Избегаем миганий при смене тем)
const savedTheme = localStorage.getItem('theme') || 'system';
if (savedTheme === 'system') {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute(
    'data-theme',
    isDark ? 'dark' : 'light'
  );
} else {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
