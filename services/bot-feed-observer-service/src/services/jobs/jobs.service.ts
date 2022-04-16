import { JobCheckForUpdatesService } from "./job-check-for-updates/job-check-for-updates.service";
import { IAbstractService } from "@ifrondonia-bot-telegram/shared/lib/interfaces/IAbstractService";
import { Service } from "typedi";

@Service()
export class JobsService implements IAbstractService {
  constructor(private jobCheckForUpdatesService: JobCheckForUpdatesService) {}

  private get subServices() {
    return [this.jobCheckForUpdatesService];
  }

  async start() {
    for (const service of this.subServices) {
      await service.start?.();
    }
  }

  async stop() {
    for (const service of this.subServices.reverse()) {
      await service.stop?.();
    }
  }
}
