import { JsonController, Get } from "routing-controllers";
import { Service } from "typedi";
import { FeedService } from "./feeds.service";

@Service()
@JsonController("/feeds")
export class FeedsController {
  constructor(readonly feedService: FeedService) {}

  @Get("/all-subscribed")
  async listAllSubscribedFeeds() {
    return this.feedService.listAllSubscribedFeeds();
  }
}
