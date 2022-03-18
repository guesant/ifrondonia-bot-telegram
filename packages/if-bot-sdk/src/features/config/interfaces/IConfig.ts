import { IConfigFeedInfo } from "./IConfigFeedInfo";

export type IConfig = {
  url: string;

  cronInterval: string;

  feeds: IConfigFeedInfo[];

  feedsToWatch: string[];
};
