// Wspólne narzędzia testów: lista stron, style, wejście na stronę w wybranym wyglądzie.
import { existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'dist');

export const STYLES = ['soft', 'flat', 'elegant', 'tender', 'round', 'pop', 'editorial', 'paper', 'glass', 'toy'];
export const THEMES = ['light', 'dark'];
export const PHONE = { width: 390, height: 844 };
export const DESKTOP = { width: 1440, height: 900 };
export const TABLET = { width: 1024, height: 768 };

/** Wszystkie strony zbudowanej dokumentacji (ścieżki zakończone „/"). */
export function allPages() {
  if (!existsSync(dist)) throw new Error('Brak docs/dist — najpierw `npm run docs` (robi to `npm test`).');
  const pages = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (name === 'index.html') pages.push(path.slice(dist.length).replace(/index\.html$/, ''));
    }
  };
  walk(dist);
  return pages.sort();
}

/** Strony-reprezentanci: sprawdzane we wszystkich stylach i motywach. */
export const KEY_PAGES = [
  '/',
  '/docs/elements/button/',
  '/docs/elements/card/',
  '/docs/forms/form/',
  '/docs/forms/checkbox-radio/',
  '/docs/navigation/navbar/',
  '/docs/overlays/modal/',
  '/examples/sklep/',
  '/examples/koszyk/',
  '/examples/panel/',
];

export const slug = (path) => (path === '/' ? 'start' : path.replace(/^\/|\/$/g, '').replaceAll('/', '-'));

/** Zbiera błędy JS i błędy konsoli strony. Wywołaj przed `open()`. */
export function watchErrors(page) {
  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  return errors;
}

/** Otwiera stronę w podanym stylu i motywie i czeka, aż skończy się ładować (z czcionkami). */
export async function open(page, path, { style = 'soft', theme = 'light' } = {}) {
  await page.goto(`${path}?theme=${theme}&style=${style}`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
}

/** O ile pikseli strona wychodzi w poziomie poza okno (0 = mieści się). */
export const overflowX = (page) =>
  page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
