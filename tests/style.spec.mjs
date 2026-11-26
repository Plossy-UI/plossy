// Strony-reprezentanci w każdym stylu i motywie: bez błędów JS, bez wychodzenia poza ekran.
import { expect, test } from '@playwright/test';
import { DESKTOP, KEY_PAGES, PHONE, STYLES, THEMES, open, overflowX, watchErrors } from './helpers.mjs';

for (const style of STYLES) {
  for (const theme of THEMES) {
    test(`styl ${style} / ${theme}`, async ({ page }) => {
      const errors = watchErrors(page);
      for (const path of KEY_PAGES) {
        for (const [name, size] of [['telefon', PHONE], ['komputer', DESKTOP]]) {
          await page.setViewportSize(size);
          await open(page, path, { style, theme });
          expect(await overflowX(page), `${path} — wyjście poza ekran (${name})`).toBeLessThanOrEqual(1);
        }
      }
      expect(errors, 'błędy JavaScript').toEqual([]);
    });
  }
}
