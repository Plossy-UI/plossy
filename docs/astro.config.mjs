import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { createCssVariablesTheme } from 'shiki';
import remarkExample from './src/plugins/remark-example.mjs';
import remarkVersion from './src/plugins/remark-version.mjs';

const theme = createCssVariablesTheme({ name: 'plossy', variablePrefix: '--shiki-', fontStyle: true });

export default defineConfig({
  // Adres strony: adresy kanoniczne i mapa strony (sitemap.xml).
  site: 'https://plossyui.com',
  devToolbar: { enabled: false },
  markdown: {
    // remarkVersion przed remarkExample: numer wersji trafia też do kodu przykładów.
    remarkPlugins: [remarkVersion, remarkExample],
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
