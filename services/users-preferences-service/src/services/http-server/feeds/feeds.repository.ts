import { Service } from "typedi";
import { UserModel } from "../../database/models/User/User.model";
import { arrayUnique } from "@ifrondonia-bot-telegram/shared/lib/features/utils/array-unique";

@Service()
export class FeedRepository {
  async listAllSubscribedFeeds() {
    const users = await UserModel.find({}, "subscribedFeeds").lean();

    const allSubscribedFeeds = arrayUnique(
      users.reduce<string[]>(
        (acc, user) => ([] as string[]).concat(acc, user.subscribedFeeds),
        []
      )
    );

    return allSubscribedFeeds;
  }
}
