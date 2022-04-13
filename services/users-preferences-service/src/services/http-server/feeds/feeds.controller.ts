import { Controller, Get } from "routing-controllers";
import { Service } from "typedi";
import { FeedService } from "./feeds.service";

@Service()
@Controller("/feeds")
export class FeedsController {
  constructor(readonly feedService: FeedService) {}

  @Get("/all-subscribed")
  async listAllSubscribedFeeds() {
    return this.feedService.listAllSubscribedFeeds();
  }
}
