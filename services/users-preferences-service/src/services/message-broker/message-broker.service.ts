import { IAbstractService } from "@ifrondonia-bot-telegram/shared/lib/interfaces/IAbstractService";
import { Service } from "typedi";
import { SeederOnStartSendPreferences } from "./seeder-on-start-send-preferences";
@Service()
export class MessageBrokerService {
  constructor(
    readonly seederOnStartSendPreferences: SeederOnStartSendPreferences
  ) {}

  private get seeders(): IAbstractService[] {
    return [this.seederOnStartSendPreferences];
  }

  private get listeners(): IAbstractService[] {
    return [];
  }

  async start() {
    for (const listenerService of this.listeners) {
      await listenerService.start?.();
    }

    for (const seederService of this.seeders) {
      await seederService.start?.();
    }
  }

  async stop() {
    for (const seederService of this.seeders.reverse()) {
      await seederService.stop?.();
    }

    for (const listenerService of this.listeners.reverse()) {
      await listenerService.stop?.();
    }
  }
}
