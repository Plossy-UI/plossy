// Generuje src/js/icons.js z wybranych ikon Lucide (lucide-static).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'node_modules/lucide-static/icons');

const names = `
arrow-down arrow-left arrow-right arrow-up arrow-up-right arrow-down-left
chevron-down chevron-left chevron-right chevron-up chevrons-left chevrons-right chevrons-up-down
check check-check x plus minus circle-check circle-x circle-alert circle-help circle-plus circle-minus
info triangle-alert octagon-alert ban
search menu ellipsis ellipsis-vertical grip-vertical grip-horizontal settings sliders-horizontal filter
home user users user-plus user-round log-in log-out lock lock-open key shield shield-check
mail phone message-circle message-square send bell bell-off at-sign
heart star bookmark thumbs-up thumbs-down smile flag tag hash
calendar clock timer history
file file-text files folder folder-open image images camera video film music
download upload cloud cloud-upload cloud-download share share-2 link link-2 external-link paperclip
copy clipboard clipboard-check pencil pen-line trash trash-2 save refresh-cw rotate-cw rotate-ccw
eye eye-off maximize minimize maximize-2 minimize-2 expand shrink zoom-in zoom-out move
play pause square skip-back skip-forward volume-2 volume-x mic
sun moon monitor smartphone laptop palette sparkles wand-sparkles zap flame droplet leaf
shopping-cart shopping-bag credit-card wallet package gift truck store receipt percent
map-pin map globe compass navigation
layout-grid layout-list layout-dashboard list list-ordered table columns-2 columns-3 rows-3 panel-left panel-right
code code-xml terminal braces database server cpu git-branch bug rocket puzzle box boxes layers component
chart-bar chart-line chart-pie trending-up trending-down activity
bold italic underline align-left align-center align-right quote type
life-buoy book-open graduation-cap lightbulb coffee award crown target circle dot loader loader-circle
`.trim().split(/\s+/);

const out = {};
const missing = [];
for (const name of names) {
  const file = join(dir, `${name}.svg`);
  if (!existsSync(file)) {
    missing.push(name);
    continue;
  }
  const svg = readFileSync(file, 'utf8');
  const body = svg
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<svg[^>]*>/, '')
    .replace('</svg>', '')
    .replace(/\s*\n\s*/g, '')
    .trim();
  out[name] = body;
}

const lines = Object.entries(out).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`);
writeFileSync(
  join(root, 'src/js/icons.js'),
  `// Plik generowany przez build/icons.mjs — nie edytuj ręcznie.\n// Ikony: Lucide (https://lucide.dev), licencja ISC.\nexport default {\n${lines.join('\n')}\n};\n`,
);
console.log(`ikony: ${Object.keys(out).length}${missing.length ? `, brak: ${missing.join(', ')}` : ''}`);
