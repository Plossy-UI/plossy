// Usuwa pamięć podręczną treści Astro przed budowaniem dokumentacji.
// Astro zapamiętuje wyrenderowany Markdown i nie zauważa zmian we wtyczkach ani numeru wersji
// w package.json — bez czyszczenia strony mogłyby pokazywać stary kod przykładów lub stare adresy CDN.
import { rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

for (const path of ['../docs/.astro/data-store.json', '../docs/node_modules/.astro/data-store.json']) {
  rmSync(fileURLToPath(new URL(path, import.meta.url)), { force: true });
}
