import * as features from "./features";

export class IFRondoniaBotSDK {
  msClients = new features.msClients.MSClientsService(this);

  constructor(public logger = features.logger.getDefaultLogger()) {}

  async setup() {
    this.logger.debug("Starting the BotSDK.");

    await this.msClients.setup();

    this.logger.debug("The BotSDK was started sucessfully.");
  }
}
