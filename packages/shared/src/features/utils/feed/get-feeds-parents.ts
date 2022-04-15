import { arrayUnique } from "../array-unique";
import { getFeedParents } from "./get-feed-parents";

export const getFeedsParents = (feeds: string[]) =>
  arrayUnique(feeds.flatMap((feed) => getFeedParents(feed)));
