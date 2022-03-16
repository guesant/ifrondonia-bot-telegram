import * as features from "./features";

export class IFClient {
  http = features.http.utils.generateHTTPClientForBaseURL(null, this.logger);

  constructor(
    public baseURL: string,
    readonly logger = features.logger.getDefaultLogger()
  ) {}

  readFeed = features.feed.readFeed(this);
}
