import { IFClient } from "../../../IFClient";
import { parseXML } from "../../utils";
import { buildCompleteFeedURL } from "../utils";
import { IParsedRemoteData, transformRemoteData } from "./remote-data";
import { getTargetRSSURL } from "./utils";

export const readFeed = (
  client: Pick<IFClient, "baseURL" | "http" | "logger">
) => {
  return async (
    resource: string,
    subdomain?: string,
    baseURL: string | null = client.baseURL
  ) => {
    if (!baseURL) {
      throw new TypeError("Invalid base URL.");
    }

    const targetURL = buildCompleteFeedURL(baseURL, resource, subdomain);

    const logger = client.logger.child({
      action: "client.feed.read",
      targetURL,
    });

    const response = await client.http({
      url: getTargetRSSURL(targetURL),
    });

    try {
      const parsedResponseData = await parseXML<IParsedRemoteData>(
        response.data
      );
      return transformRemoteData(parsedResponseData);
    } catch (error) {
      logger.error({ status: "parse.error" });
      throw error;
    }
  };
};
