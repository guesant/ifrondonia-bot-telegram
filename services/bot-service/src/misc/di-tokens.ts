import { IFRondoniaBotSDK } from "@ifrondonia-bot-telegram/bot-sdk";
import { Token } from "typedi";
import { BotService } from "../bot.service";

export const SDK_TOKEN = new Token<IFRondoniaBotSDK>("SDK");

export const BOT_SERVICE_TOKEN = new Token<BotService>("BOT_SERVICE");
