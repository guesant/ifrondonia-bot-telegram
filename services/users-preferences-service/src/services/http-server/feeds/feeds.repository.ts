import { Service } from "typedi";
import { UserModel } from "../../database/models/User/User.model";

@Service()
export class FeedRepository {
  async listAllSubscribedFeeds() {
    const users = await UserModel.find({}, "subscribedFeeds");

    const allSubscribedFeeds = Array.from(
      new Set(
        users.reduce<string[]>(
          (acc, user) => ([] as string[]).concat(acc, user.subscribedFeeds),
          []
        )
      )
    );

    return allSubscribedFeeds;
  }
}
