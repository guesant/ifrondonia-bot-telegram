import { ITransformedRemoteData, IParsedRemoteData } from "./interfaces";

const parseDate = (date: string) => new Date(date).getTime();

export const transformRemoteData = (
  remoteData: IParsedRemoteData
): ITransformedRemoteData => {
  const {
    rss: {
      channel: { item, lastBuildDate, ...channel },
    },
  } = remoteData;

  return {
    lastBuildDate: parseDate(lastBuildDate),
    items: item
      .map(({ guid: { _: guid }, category, pubDate, ...item }) => ({
        guid,
        pubDate: parseDate(pubDate),
        category: Array.isArray(category) ? category : [category],
        ...item,
      }))
      .sort((a, b) => b.pubDate - a.pubDate),
    ...channel,
  };
};
