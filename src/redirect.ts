import type { Router } from "vitepress";

import rawMapping from "./mapping.yaml";

interface RedirectionMap {
  [segment: string]: RedirectionMap | string;
}

const mapping = rawMapping as RedirectionMap;

/** A Vue plugin to handle client side redirections */
export default async (to: string, router: Router) => {
  to = to.slice(1); // remove leading slash
  let isRedirected = false;

  /* remove hash in the path */
  const hasHash = /^#\/(.+)\/?$/.exec(to);
  if (hasHash) {
    console.warn("Hash path is deprecated, redirecting...");
    to = hasHash[1];
    isRedirected = true;
  }

  /* compatibility for legacy links */
  const segments = to.split("/");

  // try to find a match in the redirect map
  let curSegment: RedirectionMap | string = mapping;

  for (const segment of segments) {
    // string => found a match
    if (typeof curSegment === "string") {
      // TODO: turn this on once migrated
      // to = curSegment;
      // isredirected = true;
      // console.warn("redirecting to new path");
      break;
    }
    if (!curSegment[segment]) break; // no match
    curSegment = curSegment[segment]; // go down a level
  }

  if (isRedirected) {
    await router.go(to);
    return false; // abort the previous navigation
  }
};
