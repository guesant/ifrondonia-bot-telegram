import { Queue } from "@ifrondonia-bot-telegram/bot-sdk/lib/features/message-broker";
import { IAbstractService } from "@ifrondonia-bot-telegram/shared/lib/interfaces/IAbstractService";
import { Service } from "typedi";
import { ProjectContainer } from "../../misc/di-container";
import { SDK_TOKEN } from "../../misc/di-tokens";

@Service()
export class SeederOnStartSendPreferences implements IAbstractService {
  get sdk() {
    return ProjectContainer.get(SDK_TOKEN);
  }

  async start() {
    await this.sdk.messageBrokerService.send({
      queue: Queue.USERS_PREFERENCES_UPDATED,
      message: {},
    });
  }
}
