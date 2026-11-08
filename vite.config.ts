/// <reference types="vitest/config" />
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The site is served from GitHub Pages under /Rakeeen/.
export default defineConfig({
  base: '/Rakeeen/',
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  // Pure logic (src/domain, src/i18n/language.ts) runs in plain node: no DOM needed.
  test: { include: ['src/**/*.test.ts'], environment: 'node' },
});
