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

  async start() {
    this.sdk.logger.debug(`Starting the ${BotObserverService.NAME}...`);

    await this.sdk.setup();

    await this.configService.start();

    this.sdk.logger.info(
      `The ${BotObserverService.NAME} was started sucessfully.`
    );

    process.once("SIGTERM", () => this.stop());
  }

  async stop() {
    this.sdk.logger.info(`Stopping the ${BotObserverService.NAME}...`);

    await this.configService.stop();

    await this.sdk.stop();

    this.sdk.logger.info(
      `The ${BotObserverService.NAME} was stopped sucessfully.`
    );
  }
}
