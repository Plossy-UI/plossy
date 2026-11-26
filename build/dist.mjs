// Buduje dist/: plossy(.min).css (wszystko), plossy.core(.min).css (sam rdzeń),
// plossy.bootstrap(.min).css (zgodność z Bootstrapem), presets/{nazwa}(.min).css, plossy.js (IIFE), plossy.min.js, plossy.esm.js, plossy.d.ts (typy), LICENSE-LUCIDE
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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

const scss = join(root, 'src/scss');
const compile = (file) => sass.compile(join(scss, file), { style: 'expanded' }).css;
const writeCss = async (name, css, head) => {
  writeFileSync(join(dist, `${name}.css`), `${head}\n${css}`);
  const min = await transform(css, { loader: 'css', minify: true });
  writeFileSync(join(dist, `${name}.min.css`), `${head}\n${min.code}`);
};

// Pełny arkusz i sam rdzeń (bez presetów data-pl-style).
await writeCss('plossy', compile('plossy.scss'), banner);
await writeCss('plossy.core', compile('plossy.core.scss'), banner);

// Wspólny początek (tokeny rdzenia) jest odcinany z plików ładowanych po rdzeniu.
const tokensCss = compile('_tokens.scss');
const withoutTokens = (css) => (css.startsWith(tokensCss) ? css.slice(tokensCss.length).trimStart() : css);

// Warstwa zgodności z Bootstrapem — osobno, do ładowania po rdzeniu.
await writeCss(
  'plossy.bootstrap',
  withoutTokens(compile('plossy.bootstrap.scss')),
  `/*! Plossy v${version} | zgodność z klasami Bootstrapa | MIT License | wymaga plossy.core.css */`,
);

// Presety osobno — do ładowania po rdzeniu.
const presetsDir = join(dist, 'presets');
rmSync(presetsDir, { recursive: true, force: true });
mkdirSync(presetsDir);
const presets = readdirSync(join(scss, 'styles'))
  .filter((file) => file.endsWith('.scss') && file !== '_engine.scss')
  .map((file) => file.slice(1, -5))
  .sort();
for (const name of presets) {
  const compiled = compile(`styles/_${name}.scss`);
  if (!compiled.startsWith(tokensCss)) throw new Error(`Preset „${name}”: nie udało się oddzielić tokenów rdzenia.`);
  const head = `/*! Plossy v${version} | preset „${name}” (data-pl-style="${name}") | MIT License | wymaga plossy.core.css */`;
  await writeCss(`presets/${name}`, withoutTokens(compiled), head);
}

const common = { entryPoints: [join(root, 'src/js/index.js')], bundle: true, banner: { js: banner }, target: 'es2020' };
await build({ ...common, format: 'iife', outfile: join(dist, 'plossy.js') });
await build({ ...common, format: 'iife', minify: true, outfile: join(dist, 'plossy.min.js') });
await build({ ...common, format: 'esm', outfile: join(dist, 'plossy.esm.js') });

// Deklaracje typów (utrzymywane ręcznie w src/types/).
writeFileSync(join(dist, 'plossy.d.ts'), readFileSync(join(root, 'src/types/plossy.d.ts'), 'utf8'));

console.log('dist/ gotowe');
