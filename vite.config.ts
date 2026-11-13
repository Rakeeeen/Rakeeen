/// <reference types="vitest/config" />
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// GitHub Pages serves the site from the root of its custom domain (rakeeeen.com, see public/CNAME).
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  // Pure logic (src/domain, src/i18n/language.ts) runs in plain node: no DOM needed.
  test: { include: ['src/**/*.test.ts'], environment: 'node' },
});
