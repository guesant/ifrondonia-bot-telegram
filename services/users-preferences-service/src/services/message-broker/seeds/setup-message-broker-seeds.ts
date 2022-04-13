import { onStartSendPreferences } from "./on-start-send-preferences";

export const setupMessageBrokerSeeds = async () => {
  await Promise.all([onStartSendPreferences()]);
};
