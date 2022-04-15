import { DEFAULT_FEED_SEPARATOR } from "./DEFAULT_FEED_SEPARATOR";

export const getFeedParents = (feed: string) =>
  feed
    .split(".")
    .reduce<string[]>(
      (acc, i, idx) => [
        ...acc.slice(0, idx),
        [acc[idx - 1], i].filter(Boolean).join(DEFAULT_FEED_SEPARATOR),
      ],
      []
    );
