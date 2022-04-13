import { features, IFRondoniaBotSDK } from "@ifrondonia-bot-telegram/bot-sdk";
import { Telegraf } from "telegraf";
import { Service } from "typedi";
import { ProjectContainer } from "./misc/di-container";
import { BOT_SERVICE_TOKEN, SDK_TOKEN } from "./misc/di-tokens";
import { MessageBrokerService } from "./services/message-broker/message-broker.service";

@Service()
export class BotService {
  bot!: Telegraf;

  sdk = new IFRondoniaBotSDK(this.logger);

  setBotToken(botToken: string) {
    this.bot = new Telegraf(botToken);
  }

  constructor(
    public logger = features.logger.getDefaultLogger(),
    public messageBrokerService: MessageBrokerService
  ) {
    ProjectContainer.set(BOT_SERVICE_TOKEN, this);
    ProjectContainer.set(SDK_TOKEN, this.sdk);
  }

  async start(botToken: string) {
    if (!botToken) {
      throw new TypeError("Invalid bot token.");
    }

    this.setBotToken(botToken);

    await this.sdk.setup();

    await this.messageBrokerService.start();

    this.bot.launch();

    process.once("SIGINT", () => this.stop("SIGINT"));
    process.once("SIGTERM", () => this.stop("SIGTERM"));
  }

  async stop(reason?: string) {
    this.bot.stop(reason);

    await this.messageBrokerService.stop();

    await this.sdk.stop();
  }
}
