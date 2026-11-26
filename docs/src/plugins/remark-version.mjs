// Podmienia w dokumentacji „plossy@X.Y" (np. w adresach CDN) na bieżące wydanie z package.json,
// żeby przykłady instalacji nie zostawały w tyle za numerem wersji.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const pkg = JSON.parse(readFileSync(fileURLToPath(new URL('../../../package.json', import.meta.url)), 'utf8'));
const current = `plossy@${pkg.version.split('.').slice(0, 2).join('.')}`;
const PATTERN = /plossy@\d+\.\d+(?:\.\d+)?/g;

export default function remarkVersion() {
  const walk = (node) => {
    if (typeof node.value === 'string' && ['code', 'inlineCode', 'text', 'html'].includes(node.type)) {
      node.value = node.value.replace(PATTERN, current);
    }
    node.children?.forEach(walk);
  };
  return walk;
}
