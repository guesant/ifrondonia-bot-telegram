import { Telegraf } from "telegraf";
import { Service } from "typedi";

@Service()
export class TelegramBotService {
  bot!: Telegraf;

  setBotToken(botToken: string) {
    this.bot = new Telegraf(botToken);
  }

  async start(botToken: string) {
    if (!botToken) {
      throw new TypeError("Invalid bot token.");
    }

    this.setBotToken(botToken);

    this.bot.launch();
  }

  async stop(reason?: string) {
    await Promise.resolve(this.bot.stop(reason));
  }
}
