import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';


const applicationsCollection = defineCollection({
  loader: glob({ pattern: '**/*.astro', base: './src/pages/applications' }),
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    image: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  applications: applicationsCollection,
};

