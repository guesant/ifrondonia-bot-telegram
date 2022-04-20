import { Queue } from "@ifrondonia-bot-telegram/bot-sdk/lib/features/message-broker";
import { CleanupFunctions } from "@ifrondonia-bot-telegram/shared/lib/features/utils/cleanup-functions";
import { Service } from "typedi";
import { ProjectContainer } from "../../misc/di-container";
import { SDK_TOKEN } from "../../misc/di-tokens";
import { broadcastConfig } from "./utils/broadcast-config";

const eventsToListenAndBroadcastConfig = [
  Queue.BROADCAST_REQUEST_CONFIG_DATA,
  Queue.USERS_PREFERENCES_UPDATED,
];

@Service()
export class ConfigService {
  get sdk() {
    return ProjectContainer.get(SDK_TOKEN);
  }

  private cleanupService = new CleanupFunctions();

  async start() {
    await this.setupListeners();
    await broadcastConfig();
  }

  async stop() {
    await this.cleanupService.run();
  }

  private async setupListeners() {
    await this.cleanupService.run();

    const cleanupFunctions = await Promise.all(
      eventsToListenAndBroadcastConfig.map((queue) =>
        this.sdk.messageBrokerService.listen({
          queue,
          callback: () => void broadcastConfig(),
        })
      )
    );

    cleanupFunctions.forEach((fn) => this.cleanupService.add(fn));
  }
}
