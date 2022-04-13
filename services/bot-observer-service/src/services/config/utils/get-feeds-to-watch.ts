import { ProjectContainer } from "../../../misc/di-container";
import { SDK_TOKEN } from "../../../misc/di-tokens";

export const getFeedsToWatch = () => {
  const sdk = ProjectContainer.get(SDK_TOKEN);
  return sdk.msClients.usersPreferences.listAllSubscribedFeeds();
};
