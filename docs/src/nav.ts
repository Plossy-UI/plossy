import { getCollection, type CollectionEntry } from 'astro:content';

export const groups = [
  { id: 'start', label: 'Start' },
  { id: 'layout', label: 'Układ' },
  { id: 'elements', label: 'Elementy' },
  { id: 'navigation', label: 'Nawigacja' },
  { id: 'forms', label: 'Formularze' },
  { id: 'overlays', label: 'Nakładki' },
  { id: 'interactive', label: 'Interakcje' },
  { id: 'utilities', label: 'Narzędzia' },
] as const;

export type Doc = CollectionEntry<'docs'>;

export interface NavGroup {
  id: string;
  label: string;
  items: { title: string; href: string; id: string; badge?: string }[];
}

export async function getNav(): Promise<NavGroup[]> {
  const docs = await getCollection('docs');
  return groups
    .map((group) => ({
      id: group.id,
      label: group.label,
      items: docs
        .filter((doc) => doc.id.split('/')[0] === group.id)
        .sort(
          (a, b) =>
            (a.data.order ?? 100) - (b.data.order ?? 100) || a.data.title.localeCompare(b.data.title, 'pl'),
        )
        .map((doc) => ({ title: doc.data.title, href: `/docs/${doc.id}/`, id: doc.id, badge: doc.data.badge })),
    }))
    .filter((group) => group.items.length);
}
