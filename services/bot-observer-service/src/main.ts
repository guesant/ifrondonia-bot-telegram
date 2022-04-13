import "reflect-metadata";
import { BotObserverService } from "./bot-observer.service";
import { ProjectContainer } from "./misc/di-container";

const botObserverService = ProjectContainer.get(BotObserverService);

botObserverService.start();
