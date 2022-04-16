import * as botSDK from "@ifrondonia-bot-telegram/bot-sdk";
import { IFClient } from "@ifrondonia-bot-telegram/if-client";
import { IAbstractService } from "@ifrondonia-bot-telegram/shared/lib/interfaces/IAbstractService";
import { Service } from "typedi";
import { ProjectContainer } from "../../misc/di-container";
import { SDK_TOKEN } from "../../misc/di-tokens";
import { ConfigService } from "../config/config.service";
import FeedService from "../database/feed/feed.service";

const {
  features: {
    messageBroker: { Queue },
    config: {
      utils: { getFeedInfoById },
    },
  },
} = botSDK;

@Service()
export class CheckForUpdatesService implements IAbstractService {
  get sdk() {
    return ProjectContainer.get(SDK_TOKEN);
  }

  constructor(private configService: ConfigService) {}

  async start() {}

  async stop() {}

  runAll() {
    return this.configService.callIfHasConfig(async ({ feedsToWatch }) => {
      for (const feedId of feedsToWatch) {
        await this.runForFeed(feedId);
      }
    });
  }

  runForFeed(feedId: string) {
    const logger = this.sdk.logger.child({ feedId });

    return this.configService.callIfHasConfig(async (config) => {
      const ifClient = new IFClient(config.url, logger);

      const feedInfo = getFeedInfoById(config, feedId);

      if (feedInfo) {
        const feedRegistry = await FeedService.getRegistryForFeedId(feedId);

        const {
          path: { resource, subdomain },
        } = feedInfo;

        const { items } = await ifClient.readFeed(resource, subdomain);

        const newerItems = items.filter(
          (item) =>
            new Date(item.pubDate) >
            (feedRegistry.lastFeedItemPublishedAt || Infinity)
        );

        await FeedService.updateLastCheckInfo(
          feedId,
          items.length > 0 ? new Date(items.at(0)!.pubDate) : undefined,
          new Date()
        );

        if (newerItems.length > 0) {
          await this.sdk.messageBrokerService.send({
            queue: Queue.FEED_UPDATE,
            message: {
              feeds: [
                {
                  id: feedId,
                  items: [
                    ...newerItems.map(({ guid, link, pubDate }) => ({
                      guid,
                      link,
                      pubDate,
                    })),
                  ],
                },
              ],
            },
          });
        }
      }
    });
  }
}
