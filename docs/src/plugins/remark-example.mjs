/**
 * Zamienia blok kodu oznaczony `example` na żywy podgląd + kod (jak w MDB):
 *
 *   ```html example
 *   <button class="pl-button">OK</button>
 *   ```
 *
 * Bezpośrednio po nim mogą wystąpić bloki ```js example-js i ```css example-css —
 * trafią do zakładek obok HTML i zostaną wykonane / wstrzyknięte w podglądzie.
 *
 * Dodatkowe słowa po `example` stają się klasami podglądu:
 *   center, column, flush, muted, tall, ink  →  .docs-preview-center itd.
 */
const LABELS = { html: 'HTML', js: 'JavaScript', css: 'CSS' };

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function transform(parent) {
  if (!Array.isArray(parent.children)) return;
  const out = [];
  for (let i = 0; i < parent.children.length; i++) {
    const node = parent.children[i];
    const meta = (node.meta || '').trim().split(/\s+/);
    if (node.type !== 'code' || !meta.includes('example')) {
      transform(node);
      out.push(node);
      continue;
    }

    const flags = meta.filter((f) => f && f !== 'example');
    const blocks = [node];
    while (
      parent.children[i + 1]?.type === 'code' &&
      /^example-(js|css)$/.test((parent.children[i + 1].meta || '').trim())
    ) {
      blocks.push(parent.children[++i]);
    }

    let preview = node.value;
    for (const block of blocks.slice(1)) {
      if (block.lang === 'css') preview = `<style>${block.value}</style>\n${preview}`;
      // Kod przykładu jest tylko przechowywany — uruchamia go docs.js po każdym wejściu na stronę
      // (także po przejściu bez przeładowania).
      else preview += `\n<script type="text/plain" data-docs-example-js>${block.value.replace(/<\/script/gi, '<\\/script')}</script>`;
    }

    const classes = ['docs-preview', ...flags.map((f) => `docs-preview-${f}`)].join(' ');
    const tabs = blocks
      .map(
        (block, index) =>
          `<button type="button" class="docs-code-tab${index === 0 ? ' is-active' : ''}" data-docs-tab="${index}">${LABELS[block.lang] || esc(block.lang || 'kod')}</button>`,
      )
      .join('');

    out.push({
      type: 'html',
      value: `<div class="docs-example"><div class="${classes}">\n${preview}\n</div><div class="docs-code"><div class="docs-code-bar"><div class="docs-code-tabs">${tabs}</div><button type="button" class="docs-copy" data-docs-copy aria-label="Kopiuj kod"><span>Kopiuj</span></button></div>`,
    });
    blocks.forEach((block, index) => {
      block.meta = null;
      out.push({ type: 'html', value: `<div class="docs-code-pane${index === 0 ? ' is-active' : ''}">` });
      out.push(block);
      out.push({ type: 'html', value: '</div>' });
    });
    out.push({ type: 'html', value: '</div></div>' });
  }
  parent.children = out;
}

export default function remarkExample() {
  return (tree) => transform(tree);
}
