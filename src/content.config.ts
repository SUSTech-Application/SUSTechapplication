import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'

const post = defineCollection({
	// Loads Markdown files in the `src/content/` directory.
	loader: glob({ pattern: "**/*.md", base: "./src/content/" }),
	// Type-check frontmatter using a schema
	// FIXME: making some fields optional for now, will refine them later
	schema: z.object({
		title: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		year: z.number(),
		category: z.string(),
		region: z.string(),
		university: z.string().optional(),
		degree: z.string().optional(),
		major: z.string(),
		program: z.string().optional(),
		employer: z.string().optional(),
	}),
});

export const collections = { post };
