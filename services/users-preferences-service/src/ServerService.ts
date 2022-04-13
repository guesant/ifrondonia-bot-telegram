import { Express } from "express";
import { Server } from "http";
import { Service } from "typedi";
import { ProjectContainer } from "./misc/di-container";
import { HOST_TOKEN } from "./misc/di-tokens";
import { setupServer } from "./services/http-server/setup-server";

const PORT = process.env.API_PORT ?? "3001";
const HOSTNAME = process.env.API_HOST ?? "0.0.0.0";

@Service()
export class ServerService {
  server: Express = setupServer();

  httpServer: Server | null = null;

  get host() {
    return ProjectContainer.get(HOST_TOKEN);
  }

  constructor(
    public readonly port = +PORT,
    public readonly hostname = HOSTNAME
  ) {}

  async start() {
    this.httpServer = await new Promise<Server>((resolve) => {
      const httpServer = this.server.listen(this.port, this.hostname, () =>
        resolve(httpServer)
      );
    });

    const address = `http://${this.hostname}:${this.port}/`;

    this.host.sdk.logger.info({
      message: `Running the HTTP server on address ${address}.`,
    });
  }

  async stop() {
    if (this.httpServer) {
      this.httpServer.close();
      this.httpServer = null;
    }
  }
}
