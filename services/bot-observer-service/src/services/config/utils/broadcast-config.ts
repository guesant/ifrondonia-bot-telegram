import { Queue } from "@ifrondonia-bot-telegram/bot-sdk/lib/features/message-broker";
import { ProjectContainer } from "../../../misc/di-container";
import { SDK_TOKEN } from "../../../misc/di-tokens";
import { getConfig } from "./get-config";

export const broadcastConfig = async () => {
  const sdk = ProjectContainer.get(SDK_TOKEN);

  const config = await getConfig();

  if (config) {
    await sdk.messageBrokerService.send({
      queue: Queue.BROADCAST_RESPONSE_CONFIG_DATA,
      message: config,
    });
  }
};
