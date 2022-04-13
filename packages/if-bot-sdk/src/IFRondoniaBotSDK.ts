import * as features from "./features";

export class IFRondoniaBotSDK {
  msClients = new features.msClients.MSClientsService(this);

  messageBrokerService =
    features.messageBroker.generateMessageBrokerService(this);

  constructor(public logger = features.logger.getDefaultLogger()) {}

  async setup() {
    this.logger.debug("Starting the BotSDK.");

    await this.messageBrokerService.setup();

    await this.msClients.setup();

    this.logger.debug("The BotSDK was started sucessfully.");
  }

  async stop() {
    await this.msClients.stop();

    await this.messageBrokerService.stop();
  }
}
