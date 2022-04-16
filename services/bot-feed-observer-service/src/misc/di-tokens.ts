import { IFRondoniaBotSDK } from "@ifrondonia-bot-telegram/bot-sdk";
import { Token } from "typedi";

export const SDK_TOKEN = new Token<IFRondoniaBotSDK>("SDK");
