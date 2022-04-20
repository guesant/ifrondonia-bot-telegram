import { CleanupFunctions } from "@ifrondonia-bot-telegram/shared/lib/features/utils/cleanup-functions";
import * as features from "./features";

const PROCESS_SIGNALS_TO_STOP_SERVICE = ["SIGINT", "SIGTERM"] as const;

export class IFRondoniaBotSDK {
  #isStopping = false;

  msClients = new features.msClients.MSClientsService(this);

  messageBrokerService =
    features.messageBroker.generateMessageBrokerService(this);

  private cleanupService = new CleanupFunctions();

  constructor(public logger = features.logger.getDefaultLogger()) {}

  async setup() {
    this.logger.debug("Starting the BotSDK.");

    await this.messageBrokerService.setup();

    await this.msClients.setup();

    this.logger.debug("The BotSDK was started sucessfully.");

    PROCESS_SIGNALS_TO_STOP_SERVICE.forEach((event) => {
      const cb = () => this.stop(event);
      process.once(event, cb);
      this.cleanupService.add(() => void process.off(event, cb));
    });
  }

  async stop(_reason?: string) {
    if (this.#isStopping) {
      return;
    }

    await this.cleanupService.run();

    this.#isStopping = true;

    await this.msClients.stop();

    await this.messageBrokerService.stop();

    this.#isStopping = false;
  }
}
