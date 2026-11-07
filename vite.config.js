import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Відносні адреси дозволяють відкрити збірку в підпапці GitHub Pages.
  base: './',
});
