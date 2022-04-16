import "reflect-metadata";
import { BotFeedObserverService } from "./bot-feed-observer.service";
import { ProjectContainer } from "./misc/di-container";

const botFeedObserverService = ProjectContainer.get(BotFeedObserverService);

botFeedObserverService.start();
