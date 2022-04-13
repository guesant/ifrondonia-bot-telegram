import { IFRondoniaBotSDK } from "@ifrondonia-bot-telegram/bot-sdk";
import { Container, Service } from "typedi";
import { DatabaseService } from "./DatabaseService";
import * as DI_TOKENS from "./misc/di-tokens";
import { MessageBrokerService } from "./MessageBrokerService";
import { ServerService } from "./ServerService";

@Service()
export class UsersPreferencesService {
  sdk = new IFRondoniaBotSDK();

  constructor(
    public databaseService: DatabaseService,
    public serverService: ServerService,
    public messageBrokerService: MessageBrokerService
  ) {
    Container.set(DI_TOKENS.HOST_TOKEN, this);
    Container.set(DI_TOKENS.SDK_TOKEN, this.sdk);
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
