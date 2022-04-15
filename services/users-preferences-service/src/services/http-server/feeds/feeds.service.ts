import { Service } from "typedi";
import { FeedRepository } from "./feeds.repository";

@Service()
export class FeedService {
  constructor(readonly feedRepository: FeedRepository) {}

  async listAllSubscribedFeeds() {
    return this.feedRepository.listAllSubscribedFeeds();
  }
}
