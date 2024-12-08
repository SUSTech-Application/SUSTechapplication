import { getCollection } from "astro:content";

/** all posts in the collection */
export default (await getCollection("post")).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
);
