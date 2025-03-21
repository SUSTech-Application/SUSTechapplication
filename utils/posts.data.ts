import { createContentLoader } from "vitepress";

export default createContentLoader("grad-application/**/*.md", {
  transform(data) {
    return data
      .filter(({ url }) => !url.endsWith("/"))
      .map(({ url, frontmatter }) => ({
        url,
        date: frontmatter.date as Date | undefined,
        title: frontmatter.title as string,
      }))
      .sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return b.date.getTime() - a.date.getTime();
      });
  },
});
