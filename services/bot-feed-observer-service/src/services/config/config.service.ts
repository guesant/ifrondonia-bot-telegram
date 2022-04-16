import { IConfig } from "@ifrondonia-bot-telegram/bot-sdk/lib/features/config";
import { Queue } from "@ifrondonia-bot-telegram/bot-sdk/lib/features/message-broker";
import { CleanupFunctions } from "@ifrondonia-bot-telegram/shared/lib/features/utils/cleanup-functions";
import { IAbstractService } from "@ifrondonia-bot-telegram/shared/lib/interfaces/IAbstractService";
import deepEqual from "deep-equal";
import { Service } from "typedi";
import { IConfigServiceDependent } from "../../interfaces/IConfigServiceDependent";
import { ProjectContainer } from "../../misc/di-container";
import { SDK_TOKEN } from "../../misc/di-tokens";

@Service()
export class ConfigService implements IAbstractService {
  config: IConfig | null = null;

  cleanupService = new CleanupFunctions();

  configServiceDependents = new Set<IConfigServiceDependent>();

  get sdk() {
    return ProjectContainer.get(SDK_TOKEN);
  }

  async start() {
    const cb1 = await this.sdk.messageBrokerService.listen({
      queue: Queue.BROADCAST_RESPONSE_CONFIG_DATA,
      callback: ({ data }) => void this.updateConfig(data),
    });

    await this.sdk.messageBrokerService.send({
      queue: Queue.BROADCAST_REQUEST_CONFIG_DATA,
    });

    this.cleanupService.add(cb1);
  }

  async stop() {
    await this.cleanupService.run();
  }

  async updateConfig(config: IConfig) {
    const prevConfig = this.config;

    this.config = config;

    if (!deepEqual(prevConfig, this.config)) {
      await this.handleConfigUpdated();
    }
  }

  private async handleConfigUpdated() {
    for (const service of this.configServiceDependents) {
      await service.onConfigUpdated?.();
    }
  }

  callIfHasConfig<T extends any = void>(
    callback: (config: IConfig) => T | Promise<T>
  ) {
    const config = this.config;

    if (config) {
      return callback(config);
    }
  }
}
