import { IFRondoniaBotSDK } from "@ifrondonia-bot-telegram/bot-sdk";
import { Service } from "typedi";
import { DatabaseService } from "./services/database/database.service";
import { MessageBrokerService } from "./services/message-broker/message-broker.service";
import { ProjectContainer } from "./misc/di-container";
import * as DI_TOKENS from "./misc/di-tokens";
import { HTTPServerService } from "./services/http-server/http-server.service";

@Service()
export class UsersPreferencesService {
  static NAME = "Users Preferences Service";

  sdk = new IFRondoniaBotSDK();

  constructor(
    public databaseService: DatabaseService,
    public httpServerService: HTTPServerService,
    public messageBrokerService: MessageBrokerService
  ) {
    ProjectContainer.set(DI_TOKENS.HOST_TOKEN, this);
    ProjectContainer.set(DI_TOKENS.SDK_TOKEN, this.sdk);
  }

  private get subServices() {
    return [
      this.databaseService,
      this.messageBrokerService,
      this.httpServerService,
    ];
  }

  async start() {
    this.sdk.logger.info(`Starting the ${UsersPreferencesService.NAME}...`);

    await this.sdk.setup();

    for (const service of this.subServices) {
      await service.start?.();
    }

    this.sdk.logger.info(
      `The ${UsersPreferencesService.NAME} was started sucessfully.`
    );

    process.once("SIGINT", () => this.stop());
    process.once("SIGTERM", () => this.stop());
  }

  async stop() {
    this.sdk.logger.info(`Stopping the ${UsersPreferencesService.NAME}...`);

    for (const service of this.subServices.reverse()) {
      await service.stop?.();
    }

    await this.sdk.stop();

    this.sdk.logger.info(
      `The ${UsersPreferencesService.NAME} was stopped sucessfully.`
    );
  }
}
