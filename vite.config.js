import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the built site works on GitHub Pages project URLs too.
  base: './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
