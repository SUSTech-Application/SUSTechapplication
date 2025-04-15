import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { parse } from "yaml";

interface RedirectionMap {
  [segment: string]: RedirectionMap | string;
}

const mapping = parse(
  readFileSync(resolve(__dirname, "./mapping.yaml"), "utf-8"),
) as RedirectionMap;

/** A Vue plugin to handle client side redirections */
export default async (to: string) => {
  let isRedirected = false;
  // TODO: this will be bound as a method, try to call router with self?
  /* remove hash in the path */
  const hasHash = /^\/#\/(.+)\/?$/.exec(to);
  if (hasHash) {
    console.warn("Hash path is deprecated, redirecting...");
    await this.go(hasHash[1]);
    isRedirected = true;
  }

  /* compatibility for legacy links */

  // split in to segments, omit empty initial segment
  const segments = to.split("/").slice(1);

  // try to find a match in the redirect map
  let curSegment: RedirectionMap | string = mapping;

  for (const segment of segments) {
    // string => found a match
    if (typeof curSegment === "string") {
      await this.go(`/${curSegment}`);
      isRedirected = true;
      break;
    }

    // no match, continue with the current route
    if (!(segment in curSegment)) break;

    curSegment = curSegment[segment]; // go down a level
  }

  return !isRedirected; // return false to cancel the current navigation
};
