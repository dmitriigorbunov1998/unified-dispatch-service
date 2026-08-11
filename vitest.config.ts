import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
    },
  },

  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,

    include: [
      'src/**/*.{test,spec}.{ts,tsx}',
      'server/**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      include: [
        'src/features/**/*.{ts,tsx}',
        'src/shared/api/**/*.ts',
        'src/shared/config/i18n/**/*.{ts,tsx}',
        'src/shared/theme/**/*.{ts,tsx}',
        'server/**/*.ts',
      ],
      exclude: [
        '**/*.test.{ts,tsx}',
        'server/index.ts',
        'server/automation/runEdsAutomation.ts',
      ],
    },
  },
});
