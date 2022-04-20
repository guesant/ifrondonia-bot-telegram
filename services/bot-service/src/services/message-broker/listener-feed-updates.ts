import { Queue } from "@ifrondonia-bot-telegram/bot-sdk/lib/features/message-broker";
import { IAbstractService } from "@ifrondonia-bot-telegram/shared/lib/interfaces/IAbstractService";
import { Service } from "typedi";
import { ProjectContainer } from "../../misc/di-container";
import { SDK_TOKEN } from "../../misc/di-tokens";
import { CleanupFunctions } from "@ifrondonia-bot-telegram/shared/lib/features/utils/cleanup-functions";

@Service()
export class ListenerFeedUpdates implements IAbstractService {
  private cleanupService = new CleanupFunctions();

  get sdk() {
    return ProjectContainer.get(SDK_TOKEN);
  }

  async start() {
    const cb1 = await this.sdk.messageBrokerService.listen({
      queue: Queue.FEED_UPDATE,
      callback: () => {},
    });

    this.cleanupService.add(cb1);
  }

  async stop() {
    await this.cleanupService.run();
  }
}
