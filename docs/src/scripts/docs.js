import { navigate } from 'astro:transitions/client';

// Skrypty samej dokumentacji (nie są częścią biblioteki).
const root = document.documentElement;
const store = {
  get: (k) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch {}
  },
};

// Dokumentacja używa płynnych przejść (ClientRouter): treść strony jest podmieniana bez
// pełnego przeładowania, więc całość uruchamia się na nowo po każdym przejściu.
// Nasłuchy na document / window dostają sygnał i są zdejmowane przed następną stroną.
let controller = null;
let sidebarScroll = null;

document.addEventListener('astro:before-swap', () => {
  sidebarScroll = document.querySelector('[data-docs-sidebar]')?.scrollTop ?? null;
});

document.addEventListener('astro:page-load', () => {
  controller?.abort();
  controller = new AbortController();
  init(controller.signal);
});

function init(signal) {
  // ── Skrypty przykładów (bloki „js example-js") ──────────────────────────
  // Uruchamiane po zainicjowaniu komponentów; błąd w jednym nie zatrzymuje pozostałych.
  // Podglądy, które się przewijają, muszą być osiągalne z klawiatury.
  requestAnimationFrame(() => {
    document.querySelectorAll('.docs-preview, .docs-table, .docs-content :is(p, li, dd, blockquote) code').forEach((box) => {
      if (box.hasAttribute('tabindex')) return;
      if (box.scrollWidth > box.clientWidth + 1 || box.scrollHeight > box.clientHeight + 1) {
        box.tabIndex = 0;
        box.setAttribute('role', 'region');
        box.setAttribute('aria-label', box.matches('code') ? 'Kod — przewiń' : box.classList.contains('docs-table') ? 'Tabela — przewiń' : 'Podgląd przykładu — przewiń');
      }
    });
  });

  queueMicrotask(() => {
    document.querySelectorAll('script[data-docs-example-js]').forEach((holder) => {
      try {
        new Function(holder.textContent)();
      } catch (error) {
        console.error('[docs] przykład:', error);
      }
    });
  });

  // ── Motyw i akcent ──────────────────────────────────────────────────────
  document.querySelector('[data-docs-theme]')?.addEventListener('click', () => {
    const next = root.dataset.plTheme === 'dark' ? 'light' : 'dark';
    const apply = () => {
      root.dataset.plTheme = next;
      store.set('plossy-theme', next);
    };
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  });

  const accentButtons = [...document.querySelectorAll('[data-docs-accent]')];
  const markAccent = () => {
    const current = root.dataset.plAccent || 'iris';
    accentButtons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.docsAccent === current));
  };
  accentButtons.forEach((btn) =>
    btn.addEventListener('click', () => {
      root.dataset.plAccent = btn.dataset.docsAccent;
      store.set('plossy-accent', btn.dataset.docsAccent);
      markAccent();
    }),
  );
  markAccent();

  // ── Styl (preset) ───────────────────────────────────────────────────────
  const styleLinks = [...document.querySelectorAll('[data-docs-style]')];
  const styleLabel = document.querySelector('[data-docs-style-label]');
  const markStyle = () => {
    const current = root.dataset.plStyle || 'soft';
    styleLinks.forEach((link) => {
      const active = link.dataset.docsStyle === current;
      link.parentElement.classList.toggle('pl-active', active);
      if (active && styleLabel) styleLabel.textContent = link.firstElementChild.firstChild.textContent.trim();
    });
  };
  styleLinks.forEach((link) =>
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const next = link.dataset.docsStyle;
      const apply = () => {
        if (next === 'soft') delete root.dataset.plStyle;
        else root.dataset.plStyle = next;
        store.set('plossy-style', next);
        markStyle();
      };
      if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(apply);
      else apply();
    }),
  );
  markStyle();

  // ── Menu mobilne ────────────────────────────────────────────────────────
  document.querySelectorAll('[data-docs-menu]').forEach((el) =>
    el.addEventListener('click', () => {
      const open = document.body.classList.toggle('docs-menu-open');
      // Na telefonie panel zaczyna od góry — tam są główne działy, styl i akcent.
      if (open && matchMedia('(max-width: 959.98px)').matches) {
        document.querySelectorAll('.docs-sidebar').forEach((panel) => (panel.scrollTop = 0));
      }
    }),
  );

  // Aktywny link w sidebarze — przewiń do widoku.
  // Po przejściu między stronami pasek boczny zostaje tam, gdzie był (bez skoku).
  const activeLink = document.querySelector('.docs-nav-link.is-active');
  const sidebar = document.querySelector('[data-docs-sidebar]');
  if (sidebar) {
    if (sidebarScroll !== null) {
      sidebar.scrollTop = sidebarScroll;
      activeLink?.scrollIntoView({ block: 'nearest' });
    } else if (activeLink) {
      const top = activeLink.offsetTop - sidebar.clientHeight / 2;
      if (top > 0) sidebar.scrollTop = top;
    }
  }
  document.body.classList.remove('docs-menu-open');

  // ── Kod: zakładki, kopiowanie, zwijanie ─────────────────────────────────
  async function copy(text, button) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.append(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    const label = button.querySelector('span');
    button.classList.add('is-copied');
    if (label) label.textContent = 'Skopiowano';
    setTimeout(() => {
      button.classList.remove('is-copied');
      if (label) label.textContent = 'Kopiuj';
    }, 1600);
  }

  document.querySelectorAll('.docs-code').forEach((code) => {
    const tabs = [...code.querySelectorAll('[data-docs-tab]')];
    const panes = [...code.querySelectorAll('.docs-code-pane')];
    tabs.forEach((tab, index) =>
      tab.addEventListener('click', () => {
        tabs.forEach((t, i) => t.classList.toggle('is-active', i === index));
        panes.forEach((p, i) => p.classList.toggle('is-active', i === index));
      }),
    );
    code.querySelector('[data-docs-copy]')?.addEventListener('click', (event) => {
      const pane = code.querySelector('.docs-code-pane.is-active pre');
      if (pane) copy(pane.innerText.replace(/\n$/, ''), event.currentTarget);
    });

    // Długi kod — zwinięty z przyciskiem „Pokaż cały kod".
    panes.forEach((pane) => {
      const pre = pane.querySelector('pre');
      if (!pre || pre.scrollHeight < 420) return;
      pane.classList.add('is-collapsed');
      const more = document.createElement('button');
      more.type = 'button';
      more.className = 'docs-code-more';
      more.textContent = 'Pokaż cały kod';
      more.addEventListener('click', () => {
        const collapsed = pane.classList.toggle('is-collapsed');
        more.textContent = collapsed ? 'Pokaż cały kod' : 'Zwiń kod';
      });
      pane.append(more);
    });
  });

  // Samodzielne bloki kodu (poza przykładami) — przycisk kopiowania.
  document.querySelectorAll('.docs-content > pre').forEach((pre) => {
    const wrap = document.createElement('div');
    wrap.className = 'docs-pre';
    pre.replaceWith(wrap);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'docs-copy';
    button.setAttribute('aria-label', 'Kopiuj kod');
    button.innerHTML = '<span>Kopiuj</span>';
    button.addEventListener('click', () => copy(pre.innerText.replace(/\n$/, ''), button));
    wrap.append(pre, button);
  });

  // Tabele — przewijanie w poziomie na wąskich ekranach.
  document.querySelectorAll('.docs-content > table').forEach((table) => {
    const wrap = document.createElement('div');
    wrap.className = 'docs-table';
    table.replaceWith(wrap);
    wrap.append(table);
  });

  // Linki „#" w podglądach nie przewijają strony.
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('.docs-preview a[href="#"]');
    if (link) event.preventDefault();
  }, { signal });

  // Formularze w podglądach nie przeładowują strony.
  document.addEventListener('submit', (event) => {
    if (event.target.closest?.('.docs-preview')) event.preventDefault();
  }, { signal });

  // ── Spis treści: podświetlanie bieżącej sekcji ──────────────────────────
  const tocLinks = [...document.querySelectorAll('[data-docs-toc] a')];
  if (tocLinks.length) {
    const map = new Map(tocLinks.map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
    const headings = [...map.keys()].map((id) => document.getElementById(id)).filter(Boolean);
    const update = () => {
      let current = headings[0];
      for (const h of headings) {
        if (h.getBoundingClientRect().top < 120) current = h;
      }
      tocLinks.forEach((a) => a.classList.toggle('is-active', a === map.get(current?.id)));
    };
    let frame = 0;
    addEventListener('scroll', () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }, { passive: true, signal });
    update();
  }

  // ── Wyszukiwarka (Ctrl+K) ───────────────────────────────────────────────
  const dialog = document.querySelector('[data-docs-search]');
  if (dialog) {
    const input = dialog.querySelector('[data-docs-search-input]');
    const list = dialog.querySelector('[data-docs-search-results]');
    const data = JSON.parse(dialog.querySelector('[data-docs-search-data]').textContent || '[]');
    const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');
    let active = 0;
    let results = [];

    const render = () => {
      const q = norm(input.value.trim());
      results = (q ? data.filter((d) => norm(d.t).includes(q) || norm(d.g).includes(q)) : data).slice(0, 60);
      active = Math.min(active, Math.max(0, results.length - 1));
      list.innerHTML = results.length
        ? results
            .map(
              (d, i) =>
                `<li><a href="${d.h}" class="${i === active ? 'is-active' : ''}"><span>${d.t}</span><small>${d.g}</small></a></li>`,
            )
            .join('')
        : '<li class="docs-search-empty">Brak wyników</li>';
      list.querySelector('.is-active')?.scrollIntoView({ block: 'nearest' });
    };

    const open = () => {
      if (dialog.open) return;
      input.value = '';
      active = 0;
      render();
      dialog.showModal();
      input.focus();
    };

    document.querySelectorAll('[data-docs-search-open]').forEach((b) => b.addEventListener('click', open));
    // Kliknięcie wyniku zamyka okno (strona nie przeładowuje się w całości).
    list.addEventListener('click', (event) => {
      if (event.target.closest('a')) dialog.close();
    });
    addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        open();
      }
    }, { signal });
    input.addEventListener('input', () => {
      active = 0;
      render();
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        active = (active + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % Math.max(1, results.length);
        render();
      } else if (event.key === 'Enter' && results[active]) {
        dialog.close();
        navigate(results[active].h);
      }
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
}
