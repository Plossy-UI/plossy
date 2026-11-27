// Mapa strony dla wyszukiwarek: dokumentacja, kreator i strony przykładowe.
import type { APIRoute } from 'astro';
import { getNav } from '../nav';
import { examples } from '../examples';

export const GET: APIRoute = async ({ site }) => {
  const nav = await getNav();
  const paths = ['/', '/kreator/', '/examples/', ...nav.flatMap((group) => group.items.map((item) => item.href)), ...examples.map((example) => `/examples/${example.slug}/`)];
  const urls = [...new Set(paths)].map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
