import { Queue } from "@ifrondonia-bot-telegram/bot-sdk/lib/features/message-broker";
import { ProjectContainer } from "../../../misc/di-container";
import { HOST_TOKEN } from "../../../misc/di-tokens";

export const onStartSendPreferences = async (
  host = ProjectContainer.get(HOST_TOKEN)
) => {
  await host.sdk.messageBrokerService.send({
    queue: Queue.USERS_PREFERENCES_UPDATED,
    message: {},
  });
};
