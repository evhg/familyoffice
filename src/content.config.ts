import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    module: z.enum(['Ring', 'Petal', 'Diamond', 'Step', 'Wave']),
    sources: z
      .array(
        z.object({
          title: z.string(),
          url: z.url(),
          publisher: z.string(),
          date: z.coerce.date(),
        }),
      )
      .default([]),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { notes };
