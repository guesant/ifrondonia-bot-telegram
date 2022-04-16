import { Service } from "typedi";
import { createConnection, getConnection } from "typeorm";
import { ProjectContainer } from "../../misc/di-container";
import { SDK_TOKEN } from "../../misc/di-tokens";
import options from "./ormconfig";

@Service()
export class DatabaseService {
  get sdk() {
    return ProjectContainer.get(SDK_TOKEN);
  }

  async start() {
    try {
      this.sdk.logger.debug("Starting a new database connection...");
      await createConnection(options);
    } catch (error) {
      this.sdk.logger.error({
        message: "Can't connect to the database.",
        error,
      });
    }
  }

  async stop() {
    try {
      const conn = getConnection();
      await conn.close();
    } catch (error) {}
  }
}
