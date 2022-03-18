import { IMessageBrokerMessage } from "./IMessageBrokerMessage";

export type IMessageBrokerListenOptions = {
  queue: string;

  callback: (
    message: IMessageBrokerMessage
  ) => (boolean | void) | Promise<boolean | void>;
};
