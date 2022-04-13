import { Express } from "express";
import { Server } from "http";
import Container, { Service } from "typedi";
import { setupServer } from "./services/http-server/setup-server";
import { HOST_TOKEN } from "./misc/di-tokens";

const PORT = process.env.API_PORT ?? "3001";
const HOSTNAME = process.env.API_HOST ?? "0.0.0.0";

@Service()
export class ServerService {
  server: Express = setupServer();

  httpServer: Server | null = null;

  get host() {
    return Container.get(HOST_TOKEN);
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

    const address = `${this.hostname}:${this.port}`;

    this.host.sdk.logger.info({
      message: `Running HTTP server on address ${address}.`,
      args: { runningAt: address },
    });
  }

  async stop() {
    if (this.httpServer) {
      this.httpServer.close();
      this.httpServer = null;
    }
  }
}
