// Dostępność: automatyczny audyt axe-core każdej strony (poważne i krytyczne naruszenia WCAG 2.1 AA),
// a stron-reprezentantów także w każdym stylu i motywie — głównie pod kątem kontrastu.
//
// Naruszenia znane w chwili dodania testów są spisane w tests/znane-naruszenia/ i nie psują wyniku;
// test nie przechodzi, gdy pojawi się NOWE. Po naprawieniu czegoś odśwież spis: `npm run test:a11y-spis`.
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DESKTOP, KEY_PAGES, STYLES, THEMES, allPages, open, slug } from './helpers.mjs';

test.use({ viewport: DESKTOP });

const knownDir = join(dirname(fileURLToPath(import.meta.url)), 'znane-naruszenia');
const UPDATE = !!process.env.A11Y_SPIS;

/** Lista naruszeń w postaci „reguła @ selektor". */
async function audit(page) {
  // Animacje wejścia zostawiają elementy półprzezroczyste — axe liczyłby kontrast w połowie ruchu.
  await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
  await page.evaluate(() => document.querySelectorAll('.pl-invisible').forEach((el) => el.classList.remove('pl-invisible')));
  const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  return violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .flatMap((v) => v.nodes.map((n) => `${v.id} @ ${stable(n.target.join(' '))}`));
}

/** Usuwa z selektora to, co zmienia się między uruchomieniami: losowe id, daty, numery pozycji. */
const stable = (selector) =>
  selector
    .replace(/\[(aria-labelledby|aria-controls|aria-describedby|aria-owns|aria-activedescendant|for|id)[~|^$*]?="[^"]*"\]/g, '[$1]')
    .replace(/#pl-[\w-]+/g, '#pl-*')
    .replace(/\[(data-date|aria-label|aria-current|aria-selected)[~|^$*]?="[^"]*"\]/g, '[$1]')
    .replace(/\[(aria-current|aria-selected)\]/g, '')
    .replace(/:nth-child\(\d+\)/g, '');

/** Porównuje ze spisem znanych naruszeń; zwraca tylko nowe. */
function onlyNew(name, found) {
  const file = join(knownDir, `${name}.json`);
  const unique = [...new Set(found)].sort();
  if (UPDATE) {
    if (unique.length) {
      mkdirSync(knownDir, { recursive: true });
      writeFileSync(file, `${JSON.stringify(unique, null, 2)}\n`);
    } else rmSync(file, { force: true });
    return [];
  }
  const known = new Set(existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : []);
  return unique.filter((entry) => !known.has(entry));
}

for (const path of allPages()) {
  test(`axe ${path}`, async ({ page }) => {
    await open(page, path);
    expect(onlyNew(slug(path), await audit(page)), 'nowe naruszenia dostępności').toEqual([]);
  });
}

for (const style of STYLES) {
  for (const theme of THEMES) {
    if (style === 'soft' && theme === 'light') continue; // sprawdzone wyżej
    test(`axe — styl ${style} / ${theme}`, async ({ page }) => {
      const found = [];
      for (const path of KEY_PAGES) {
        await open(page, path, { style, theme });
        found.push(...(await audit(page)).map((entry) => `${path} → ${entry}`));
      }
      expect(onlyNew(`styl-${style}-${theme}`, found), 'nowe naruszenia dostępności').toEqual([]);
    });
  }
}
