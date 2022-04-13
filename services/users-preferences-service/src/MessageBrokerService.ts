import { Service } from "typedi";
import { setupMessageBroker } from "./services/message-broker";

@Service()
export class MessageBrokerService {
  async start() {
    await setupMessageBroker();
  }

  async stop() {}
}
