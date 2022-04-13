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

  async start() {
    this.sdk.logger.debug(`Starting the ${UsersPreferencesService.NAME}...`);

    await this.sdk.setup();

    await this.databaseService.start();

    await this.messageBrokerService.start();

    await this.httpServerService.start();

    this.sdk.logger.info(
      `The ${UsersPreferencesService.NAME} was started sucessfully.`
    );

    process.once("SIGTERM", () => this.stop());
  }

  async stop() {
    this.sdk.logger.info(`Stopping the ${UsersPreferencesService.NAME}...`);

    await this.httpServerService.stop();

    await this.messageBrokerService.stop();

    await this.databaseService.stop();

    await this.sdk.stop();

    this.sdk.logger.info(
      `The ${UsersPreferencesService.NAME} was stopped sucessfully.`
    );
  }
}
