import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
    // Znaczek w nawigacji i nagłówku: „JS" dla komponentów ze skryptem, „Nowy" itp.
    badge: z.string().optional(),
  }),
});

export const collections = { docs };
