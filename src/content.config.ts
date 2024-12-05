import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	// FIXME: suppress some frontmatter checking for now
	schema: z.object({
		title: z.string(),
	// 	description: z.string(),
	// 	// Transform string to Date object
		pubDate: z.coerce.date(),
	// 	updatedDate: z.coerce.date().optional(),
	// 	heroImage: z.string().optional(),
	}),
});

export const collections = { blog };
