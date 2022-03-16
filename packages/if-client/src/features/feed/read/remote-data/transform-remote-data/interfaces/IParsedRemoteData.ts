export type IParsedRemoteData = {
  rss: {
    channel: IParsedRemoteDataChannel;
  };
};

export type IParsedRemoteDataChannelItem = {
  title: string;
  link: string;
  guid: { _: string };
  description: string;
  author: string;
  category: string | string[];
  pubDate: string;
};

export type IParsedRemoteDataChannel = {
  title: string;
  description: string;
  link: string;
  lastBuildDate: string;
  generator: string;
  language: string;
  item: IParsedRemoteDataChannelItem[];
};
