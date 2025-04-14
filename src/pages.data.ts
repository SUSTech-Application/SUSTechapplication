import { createContentLoader } from "vitepress";

import { z } from "zod";

// TODO: more validations
const Metadata = z
  .object({
    date: z.string(),
  })
  .passthrough();

export interface Page {
  title?: string;
  url: string;
  metadata: z.infer<typeof Metadata>;
}

export default createContentLoader("**/*.md", {
  includeSrc: true,
  transform(data): Page[] {
    return data
      .map((page) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const src = page.src!;
        const title = /^# (.*)$/m.exec(src)?.[1].trim();
        // dropping page.src, renameing frontmatter to metadata
        return { title, url: page.url, metadata: page.frontmatter };
      })
      .map((page) => ({
        // assert page.metadata.date is Date
        ...page,
        metadata: {
          ...page.metadata,
          date: z.union([z.date(), z.undefined()]).parse(page.metadata.date),
        },
      }))
      .sort((a, b) => {
        // sort according to date
        const dateA = a.metadata.date;
        const dateB = b.metadata.date;
        // If both dates exist, sort newest first
        if (dateA && dateB) return dateB.getTime() - dateA.getTime();
        // If only one date exists, prioritize the one with a date
        if (dateA) return -1;
        if (dateB) return 1;
        // If no dates, fall back to alphabetical by title
        return a.title?.localeCompare(b.title ?? "") ?? 0;
      })
      .map((page) => ({
        // convert date to string
        ...page,
        metadata: {
          ...page.metadata,
          date: page.metadata.date?.toISOString().split("T")[0] ?? "",
        },
      }))
      .map((page) => ({
        // validate type of the the whole metadata object
        ...page,
        metadata: Metadata.parse(page.metadata),
      }));
  },
});

// placeholder type information, it will be exported by VitePress
export const data: Page[] = [];
