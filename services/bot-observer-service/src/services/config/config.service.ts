import { Queue } from "@ifrondonia-bot-telegram/bot-sdk/lib/features/message-broker";
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

  #cleanupFunctions = new Set<() => void>();

  private async runCleanupFunctions() {
    for (const fn of this.#cleanupFunctions) {
      await Promise.resolve(fn());
      this.#cleanupFunctions.delete(fn);
    }
  }

  async start() {
    await this.setupListeners();
    await broadcastConfig();
  }

  async stop() {
    await this.runCleanupFunctions();
  }

  private async setupListeners() {
    await this.runCleanupFunctions();

    const cleanupFunctions = await Promise.all(
      eventsToListenAndBroadcastConfig.map((queue) =>
        this.sdk.messageBrokerService.listen({
          queue,
          callback: () => void broadcastConfig(),
        })
      )
    );

    cleanupFunctions.forEach((fn) => this.#cleanupFunctions.add(fn));
  }
}
