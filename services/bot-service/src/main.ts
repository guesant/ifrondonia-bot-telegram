import { BotService } from "./bot.service";
import { ProjectContainer } from "./misc/di-container";

const botService = ProjectContainer.get(BotService);

botService.start(process.env.BOT_TOKEN!);
