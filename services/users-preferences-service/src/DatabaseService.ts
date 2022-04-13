import mongoose from "mongoose";
import Container, { Service } from "typedi";
import { SDK_TOKEN } from "./misc/di-tokens";

@Service()
export class DatabaseService {
  get sdk() {
    return Container.get(SDK_TOKEN);
  }

  async start() {
    try {
      this.sdk.logger.debug("Starting a new database connection...");

      await mongoose.connect(process.env.MONGODB_URI!);
    } catch (error) {
      this.sdk.logger.error({
        message: "Can not connect to the database.",
        error,
      });
    }
  }

  async stop() {
    await mongoose.disconnect();
  }
}
