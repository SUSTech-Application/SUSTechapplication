import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import type { Router } from "vitepress";

import { parse } from "yaml";

interface RedirectionMap {
  [segment: string]: RedirectionMap | string;
}

const mapping = parse(
  readFileSync(resolve(__dirname, "./mapping.yaml"), "utf-8"),
) as RedirectionMap;

/** A Vue plugin to handle client side redirections */
export default async (to: string, router: Router) => {
  // split in to segments, omit empty initial segment
  const segments = to.split("/").slice(1);

  // try to find a match in the redirect map
  let curSegment: RedirectionMap | string = mapping;

  for (const segment of segments) {
    // string => found a match
    if (typeof curSegment === "string") {
      await router.go(`/${curSegment}`);
      return false; // abort previous routing
    }

    // no match, continue with the current route
    if (!(segment in curSegment)) return;

    curSegment = curSegment[segment]; // go down a level
  }
};
