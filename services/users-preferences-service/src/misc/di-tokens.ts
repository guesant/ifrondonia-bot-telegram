import { IFRondoniaBotSDK } from "@ifrondonia-bot-telegram/bot-sdk";
import { Token } from "typedi";
import { UsersPreferencesService } from "../users-preferences.service";

export const SDK_TOKEN = new Token<IFRondoniaBotSDK>("SDK");

export const HOST_TOKEN = new Token<UsersPreferencesService>("HOST");
