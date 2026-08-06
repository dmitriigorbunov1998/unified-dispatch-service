import path from 'node:path';

import { defineConfig } from 'vite';

const isGitHubPages = (process.env.VITE_DEPLOY_TARGET = 'github');

export default defineConfig({
  base: isGitHubPages ? '/unified-dispatch-service/' : '/',

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@core': path.resolve(__dirname, './src/core'),
      '@types': path.resolve(__dirname, './src/types'),
      '@mock': path.resolve(__dirname, './src/mock'),
    },
  },
});
