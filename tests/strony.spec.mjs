// Każda strona dokumentacji i przykładów: ładuje się bez błędów JS i mieści się w poziomie
// na telefonie i na komputerze.
import { expect, test } from '@playwright/test';
import { DESKTOP, PHONE, allPages, open, overflowX, watchErrors } from './helpers.mjs';

for (const path of allPages()) {
  test(`strona ${path}`, async ({ page }) => {
    const errors = watchErrors(page);
    for (const [name, size] of [['telefon', PHONE], ['komputer', DESKTOP]]) {
      await page.setViewportSize(size);
      await open(page, path);
      expect(await overflowX(page), `wyjście poza ekran — ${name}`).toBeLessThanOrEqual(1);
    }
    expect(errors, 'błędy JavaScript').toEqual([]);
  });
}
