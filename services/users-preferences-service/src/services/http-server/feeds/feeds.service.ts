import { IFRondoniaBotSDK } from "@ifrondonia-bot-telegram/bot-sdk";
import { Inject, Service } from "typedi";
import { SDK_TOKEN } from "../../../misc/di-tokens";
import { FeedRepository } from "./feeds.repository";

@Service()
export class FeedService {
  constructor(
    readonly feedRepository: FeedRepository,
    @Inject(SDK_TOKEN) readonly sdk: IFRondoniaBotSDK
  ) {}

  async listAllSubscribedFeeds() {
    return this.feedRepository.listAllSubscribedFeeds();
  }
}
