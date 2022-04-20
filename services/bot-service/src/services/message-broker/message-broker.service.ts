import { IAbstractService } from "@ifrondonia-bot-telegram/shared/lib/interfaces/IAbstractService";
import { Service } from "typedi";
import { ListenerFeedUpdates } from "./listener-feed-updates";

@Service()
export class MessageBrokerService {
  constructor(readonly listenerFeedUpdates: ListenerFeedUpdates) {}

  private get seeders(): IAbstractService[] {
    return [];
  }

  private get listeners(): IAbstractService[] {
    return [this.listenerFeedUpdates];
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
