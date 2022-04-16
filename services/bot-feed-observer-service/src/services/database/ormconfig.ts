import { resolve } from "path";
import { Feed } from "./feed/feed.entity";
import { ConnectionOptions } from "typeorm";

const defaultConfig: ConnectionOptions = {
  type: "better-sqlite3",
  database: resolve(__dirname, "../../../volumes/sqlite/data.db"),
  entities: [Feed],
  synchronize: true,
  logging: true,
};

export default defaultConfig;
