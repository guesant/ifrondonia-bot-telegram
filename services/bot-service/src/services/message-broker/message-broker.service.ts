import { Service } from "typedi";
import { setupMessageBroker } from "./setup-message-broker";

@Service()
export class MessageBrokerService {
  async start() {
    await setupMessageBroker();
  }

  async stop() {}
}
