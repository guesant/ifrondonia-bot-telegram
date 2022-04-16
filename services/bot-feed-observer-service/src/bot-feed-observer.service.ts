import { IFRondoniaBotSDK } from "@ifrondonia-bot-telegram/bot-sdk";
import { IAbstractService } from "@ifrondonia-bot-telegram/shared/lib/interfaces/IAbstractService";
import { Service } from "typedi";
import { ProjectContainer } from "./misc/di-container";
import * as DI_TOKENS from "./misc/di-tokens";
import { CheckForUpdatesService } from "./services/check-for-updates/check-for-updates.service";
import { ConfigService } from "./services/config/config.service";
import { DatabaseService } from "./services/database/database.service";
import { JobsService } from "./services/jobs/jobs.service";

@Service()
export class BotFeedObserverService implements IAbstractService {
  static NAME = "Bot Feed Observer Service";

  sdk = new IFRondoniaBotSDK();

  constructor(
    private databaseService: DatabaseService,
    private jobsService: JobsService,
    private configService: ConfigService,
    private checkForUpdatesService: CheckForUpdatesService
  ) {
    ProjectContainer.set(DI_TOKENS.SDK_TOKEN, this.sdk);
  }

  private get subServices() {
    return [
      this.databaseService,
      this.checkForUpdatesService,
      this.jobsService,
      this.configService,
    ];
  }

  async start() {
    this.sdk.logger.info(`Starting the ${BotFeedObserverService.NAME}...`);

    await this.sdk.setup();

    for (const service of this.subServices) {
      await service.start?.();
    }

    this.sdk.logger.info(
      `The ${BotFeedObserverService.NAME} was started sucessfully.`
    );

    process.once("SIGINT", () => this.stop());
    process.once("SIGTERM", () => this.stop());
  }

  async stop() {
    this.sdk.logger.info(`Stopping the ${BotFeedObserverService.NAME}...`);

    for (const service of this.subServices.reverse()) {
      await service.stop?.();
    }

    await this.sdk.stop();

    this.sdk.logger.info(
      `The ${BotFeedObserverService.NAME} was stopped sucessfully.`
    );
  }
}
