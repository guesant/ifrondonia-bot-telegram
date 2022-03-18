import { IConfig } from "../interfaces";

export const getFeedInfoById = (config: IConfig, feedId: string) => {
  const { feeds } = config;
  return feeds.find((feedInfo) => feedInfo.id === feedId) ?? null;
};
