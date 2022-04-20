import { features, IFRondoniaBotSDK } from "@ifrondonia-bot-telegram/bot-sdk";
import { Service } from "typedi";
import { ProjectContainer } from "./misc/di-container";
import { BOT_SERVICE_TOKEN, SDK_TOKEN } from "./misc/di-tokens";
import { MessageBrokerService } from "./services/message-broker/message-broker.service";
import { TelegramBotService } from "./services/telegram-bot/telegram-bot.service";

@Service()
export class BotService {
  sdk = new IFRondoniaBotSDK(this.logger);

  constructor(
    private logger = features.logger.getDefaultLogger(),
    private telegramBotService: TelegramBotService,
    private messageBrokerService: MessageBrokerService
  ) {
    ProjectContainer.set(BOT_SERVICE_TOKEN, this);
    ProjectContainer.set(SDK_TOKEN, this.sdk);
  }

  private get subServices() {
    return [this.messageBrokerService];
  }

  async start(botToken: string) {
    await this.sdk.setup();

    for (const service of this.subServices) {
      await service.start?.();
    }

    await this.telegramBotService.start(botToken);

    process.once("SIGINT", () => this.stop("SIGINT"));
    process.once("SIGTERM", () => this.stop("SIGTERM"));
  }

  async stop(reason?: string) {
    await this.telegramBotService.stop(reason);

    for (const service of this.subServices.reverse()) {
      await service.stop?.();
    }

    await this.sdk.stop();
  }
}
