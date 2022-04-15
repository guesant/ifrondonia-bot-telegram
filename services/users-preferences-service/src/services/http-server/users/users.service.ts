import * as BotSDK from "@ifrondonia-bot-telegram/bot-sdk";
import { arrayUnique } from "@ifrondonia-bot-telegram/shared/lib/features/utils/array-unique";
import { ensureArray } from "@ifrondonia-bot-telegram/shared/lib/features/utils/ensure-array";
import { Service } from "typedi";
import { ProjectContainer } from "../../../misc/di-container";
import { SDK_TOKEN } from "../../../misc/di-tokens";
import { SyncBodyDto } from "./dtos/SyncBodyDto";
import { SyncBodyDtoFeedOperation } from "./dtos/SyncBodyDtoFeedOperation";
import { UserRepository } from "./users.repository";

const {
  features: {
    messageBroker: { Queue },
  },
} = BotSDK;

@Service()
export class UsersService {
  get sdk() {
    return ProjectContainer.get(SDK_TOKEN);
  }

  constructor(readonly usersRepository: UserRepository) {}

  async list(feeds: string | string[]) {
    return this.usersRepository.findAll({ feedOr: ensureArray(feeds) });
  }

  async sync(body: SyncBodyDto) {
    const { actions } = body;

    for (const action of actions) {
      const { targets, feeds } = action;

      const [feedsToSubscribe, feedsToUnsubscribe] = [
        SyncBodyDtoFeedOperation.SUBSCRIBE,
        SyncBodyDtoFeedOperation.UNSUBSCRIBE,
      ].map((targetOperation) =>
        feeds
          .filter(({ operation }) => operation === targetOperation)
          .map((feed) => feed.id)
      );

      for (const telegramUserId of targets) {
        const user = await this.usersRepository.createOrFindByTelegramId(
          telegramUserId
        );

        if (user) {
          user.subscribedFeeds = arrayUnique(
            [...user.subscribedFeeds, ...feedsToSubscribe].filter(
              (feedId) => !feedsToUnsubscribe.includes(feedId)
            )
          );

          if (user.subscribedFeeds.length > 0) {
            await user.save();
          } else {
            await user.delete();
          }
        }
      }
    }

    await this.sdk.messageBrokerService.send({
      queue: Queue.USERS_PREFERENCES_UPDATED,
    });

    return {
      status: "done",
    };
  }
}
