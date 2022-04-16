import { CleanupFunctions } from "@ifrondonia-bot-telegram/shared/lib/features/utils/cleanup-functions";
import { IAbstractService } from "@ifrondonia-bot-telegram/shared/lib/interfaces/IAbstractService";
import { CronJob } from "cron";
import { Service } from "typedi";
import { IConfigServiceDependent } from "../../../interfaces/IConfigServiceDependent";
import { CheckForUpdatesService } from "../../check-for-updates/check-for-updates.service";
import { ConfigService } from "../../config/config.service";

@Service()
export class JobCheckForUpdatesService
  implements IAbstractService, IConfigServiceDependent
{
  cleanupService = new CleanupFunctions();

  get config() {
    return this.configService.config;
  }

  constructor(
    private configService: ConfigService,
    private checkForUpdatesService: CheckForUpdatesService
  ) {}

  async setup() {
    await this.cleanupService.run();

    const config = this.config;

    if (config) {
      await this.tick();

      const job = new CronJob(config.cronInterval, () => this.tick());

      job.start();

      this.cleanupService.add(() => Promise.resolve(job.stop()));
    }
  }

  async start() {
    this.configService.configServiceDependents.add(this);
    await this.setup();
  }

  async stop() {
    this.configService.configServiceDependents.delete(this);
  }

  async onConfigUpdated() {
    await this.setup();
  }

  async tick() {
    await this.checkForUpdatesService.runAll();
  }
}
