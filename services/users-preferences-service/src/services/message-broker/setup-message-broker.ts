import { setupMessageBrokerListeners } from "./listeners";
import { setupMessageBrokerSeeds } from "./seeds";

export const setupMessageBroker = async () => {
  await setupMessageBrokerListeners();
  await setupMessageBrokerSeeds();
};
