import { IFRondoniaBotSDK } from "@ifrondonia-bot-telegram/bot-sdk";
import { ConfigService } from "./services/config/config.service";
import { Service } from "typedi";
import { ProjectContainer } from "./misc/di-container";
import * as DI_TOKENS from "./misc/di-tokens";

@Service()
export class BotObserverService {
  static NAME = "Bot Observer Service";

  sdk = new IFRondoniaBotSDK();

  constructor(public configService: ConfigService) {
    ProjectContainer.set(DI_TOKENS.BOT_OBSERVER_TOKEN, this);
    ProjectContainer.set(DI_TOKENS.SDK_TOKEN, this.sdk);
  }

  private get subServices() {
    return [this.configService];
  }

  async start() {
    this.sdk.logger.info(`Starting the ${BotObserverService.NAME}...`);

    await this.sdk.setup();

    for (const service of this.subServices) {
      await service.start?.();
    }

    this.sdk.logger.info(
      `The ${BotObserverService.NAME} was started sucessfully.`
    );

    process.once("SIGTERM", () => this.stop());
  }

  async stop() {
    this.sdk.logger.info(`Stopping the ${BotObserverService.NAME}...`);

    for (const service of this.subServices.reverse()) {
      await service.stop?.();
    }

    await this.sdk.stop();

    this.sdk.logger.info(
      `The ${BotObserverService.NAME} was stopped sucessfully.`
    );
  }
}
