import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { createCssVariablesTheme } from 'shiki';
import remarkExample from './src/plugins/remark-example.mjs';

const theme = createCssVariablesTheme({ name: 'plossy', variablePrefix: '--shiki-', fontStyle: true });

export default defineConfig({
  devToolbar: { enabled: false },
  markdown: {
    remarkPlugins: [remarkExample],
    shikiConfig: { theme, wrap: false },
  },
  vite: {
    resolve: {
      alias: { '@plossy': fileURLToPath(new URL('../src', import.meta.url)) },
    },
    server: {
      fs: { allow: ['..'] },
      // Gdy system zgłasza ENOSPC (limit obserwatorów plików): PLOSSY_POLL=1 npm run dev
      watch: process.env.PLOSSY_POLL ? { usePolling: true, interval: 400 } : undefined,
    },
  },
});
