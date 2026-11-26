// Regresje wizualne: zrzuty stron-wzorców w każdym stylu i motywie, porównywane z zapisanymi
// w tests/zrzuty/. Celowa zmiana wyglądu → odśwież wzorce: `npm run test:zrzuty` i przejrzyj różnice w git.
import { expect, test } from '@playwright/test';
import { STYLES, THEMES, open, slug } from './helpers.mjs';

// Strony bez elementów zmieniających się w czasie (autoodtwarzanie, liczniki, daty).
const PAGES = ['/docs/elements/button/', '/docs/elements/card/', '/docs/forms/form/', '/docs/forms/checkbox-radio/', '/docs/elements/alert/', '/examples/koszyk/'];

test.use({ viewport: { width: 1280, height: 1600 } });

for (const style of STYLES) {
  for (const theme of THEMES) {
    test(`wygląd — ${style} / ${theme}`, async ({ page }) => {
      for (const path of PAGES) {
        await open(page, path, { style, theme });
        // Elementy czekające na wejście w widok mają być od razu widoczne.
        await page.evaluate(() => document.querySelectorAll('.pl-invisible').forEach((el) => el.classList.remove('pl-invisible')));
        await expect.soft(page).toHaveScreenshot(`${style}-${theme}/${slug(path)}.png`);
      }
    });
  }
}
