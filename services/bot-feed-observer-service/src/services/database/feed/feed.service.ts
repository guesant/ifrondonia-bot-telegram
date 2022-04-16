import { getRepository } from "typeorm";
import { Feed } from "./feed.entity";

class FeedService {
  get repository() {
    return getRepository(Feed);
  }

  async create(feedId: Feed["feedId"]) {
    const newFeed = new Feed();

    Object.assign(newFeed, { feedId });

    return this.repository.save(newFeed);
  }

  async getRegistryForFeedId(feedId: Feed["feedId"]) {
    const dbFeed = await this.repository.findOne({ where: { feedId } });

    return dbFeed || this.create(feedId);
  }

  async updateLastCheckInfo(
    feedId: Feed["feedId"],
    lastFeedItemPublishedAt?: Feed["lastFeedItemPublishedAt"],
    lastCheck?: Feed["lastCheck"]
  ) {
    const feed = await this.getRegistryForFeedId(feedId);

    lastCheck && Object.assign(feed, { lastCheck });
    lastFeedItemPublishedAt && Object.assign(feed, { lastFeedItemPublishedAt });

    return this.repository.save(feed);
  }
}

export default new FeedService();
