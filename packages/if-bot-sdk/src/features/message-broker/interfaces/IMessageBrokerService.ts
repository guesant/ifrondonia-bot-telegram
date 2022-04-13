import { IMessageBrokerListenOptions } from "./IMessageBrokerListenOptions";
import { IMessageBrokerSendOptions } from "./IMessageBrokerSendOptions";

export interface IMessageBrokerService {
  setup(): Promise<void>;

  stop(): Promise<void>;

  send(options: IMessageBrokerSendOptions): Promise<void>;

  listen(options: IMessageBrokerListenOptions): Promise<() => void>;
}
