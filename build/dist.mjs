// Buduje dist/: plossy.css, plossy.min.css, plossy.js (IIFE), plossy.min.js, plossy.esm.js, LICENSE-LUCIDE
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import * as sass from 'sass';
import { build, transform } from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
mkdirSync(dist, { recursive: true });

// Licencja ikon (Lucide — ISC, część pochodząca z Feather — MIT): kopiowana do dist/ przy każdym
// buildzie i wklejana w całości do nagłówków, żeby pliki pobrane osobno (CDN) niosły pełne noty.
const lucideLicense = readFileSync(join(root, 'node_modules/lucide-static/LICENSE'), 'utf8');
writeFileSync(join(dist, 'LICENSE-LUCIDE'), lucideLicense);

const version = process.env.npm_package_version || JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
const notice = lucideLicense
  .trim()
  .replaceAll('*/', '* /') // tekst nie może zamknąć komentarza
  .split(/\r?\n/)
  .map((line) => (` * ${line}`).trimEnd())
  .join('\n');
// „/*!" — komentarz prawny: minifikatory i CDN-y go zachowują.
const banner = `/*!
 * Plossy v${version} | MIT License
 *
 * Includes icons from Lucide (https://lucide.dev), some of them derived from Feather.
 * Full third-party notices (also shipped as LICENSE-LUCIDE):
 *
${notice}
 */`;

const css = sass.compile(join(root, 'src/scss/plossy.scss'), { style: 'expanded' }).css;
writeFileSync(join(dist, 'plossy.css'), `${banner}\n${css}`);
const min = await transform(css, { loader: 'css', minify: true });
writeFileSync(join(dist, 'plossy.min.css'), `${banner}\n${min.code}`);

const common = { entryPoints: [join(root, 'src/js/index.js')], bundle: true, banner: { js: banner }, target: 'es2020' };
await build({ ...common, format: 'iife', outfile: join(dist, 'plossy.js') });
await build({ ...common, format: 'iife', minify: true, outfile: join(dist, 'plossy.min.js') });
await build({ ...common, format: 'esm', outfile: join(dist, 'plossy.esm.js') });

console.log('dist/ gotowe');
