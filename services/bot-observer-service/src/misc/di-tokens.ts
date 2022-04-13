import { IFRondoniaBotSDK } from "@ifrondonia-bot-telegram/bot-sdk";
import { Token } from "typedi";
import { BotObserverService } from "../bot-observer.service";

export const SDK_TOKEN = new Token<IFRondoniaBotSDK>("SDK");

export const BOT_OBSERVER_TOKEN = new Token<BotObserverService>("HOST");
