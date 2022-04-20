import { ITransformedRemoteData, IParsedRemoteData } from "./interfaces";
import { transformRemoteDataDate } from "./transform-remote-data-date";

export const transformRemoteData = (
  remoteData: IParsedRemoteData
): ITransformedRemoteData => {
  const {
    rss: {
      channel: { item, lastBuildDate, ...channel },
    },
  } = remoteData;

  return {
    lastBuildDate: transformRemoteDataDate(lastBuildDate),
    items: item
      .map(({ category, pubDate, ...item }) => ({
        pubDate: transformRemoteDataDate(pubDate),
        category: Array.isArray(category) ? category : [category],
        ...item,
      }))
      .sort((a, b) => b.pubDate - a.pubDate),
    ...channel,
  };
};
