export type IParsedRemoteDataChannelItem = {
  title: string;
  link: string;
  guid: string;
  description: string;
  author: string;
  category: string | string[];
  pubDate: string;
};

export type IParsedRemoteDataChannel = Record<string, any> & {
  title: string;
  description: string;
  link: string;
  lastBuildDate: string;
  generator: string;
  language: string;
  item: IParsedRemoteDataChannelItem[];
};

export type IParsedRemoteData = {
  rss: {
    channel: IParsedRemoteDataChannel;
  };
};
