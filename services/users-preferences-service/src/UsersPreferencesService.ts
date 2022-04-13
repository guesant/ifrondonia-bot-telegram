import { IFRondoniaBotSDK } from "@ifrondonia-bot-telegram/bot-sdk";
import { Service } from "typedi";
import { DatabaseService } from "./DatabaseService";
import { MessageBrokerService } from "./MessageBrokerService";
import { ProjectContainer } from "./misc/di-container";
import * as DI_TOKENS from "./misc/di-tokens";
import { ServerService } from "./ServerService";

@Service()
export class UsersPreferencesService {
  sdk = new IFRondoniaBotSDK();

  constructor(
    public databaseService: DatabaseService,
    public serverService: ServerService,
    public messageBrokerService: MessageBrokerService
  ) {
    ProjectContainer.set(DI_TOKENS.HOST_TOKEN, this);
    ProjectContainer.set(DI_TOKENS.SDK_TOKEN, this.sdk);
  }

  async start() {
    this.sdk.logger.debug("Starting the Users Preferences Service...");

    await this.sdk.setup();

    await this.databaseService.start();

    await this.messageBrokerService.start();

    await this.serverService.start();

    this.sdk.logger.debug(
      "The Users Preferences Service was started sucessfully."
    );
  }

  async stop() {
    await this.serverService.stop();

    await this.messageBrokerService.stop();

    await this.databaseService.stop();

    await this.sdk.stop();
  }
}
