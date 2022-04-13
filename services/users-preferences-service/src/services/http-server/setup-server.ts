import { Express } from "express";
import { createExpressServer, useContainer } from "routing-controllers";
import { ProjectContainer } from "../../misc/di-container";
import { FeedsController } from "./feeds/feeds.controller";
import { UsersController } from "./users/users.controller";

const controllers = [
  UsersController,
  FeedsController,
  /* */
];

export const setupServer = (): Express => {
  useContainer(ProjectContainer);

  const server = createExpressServer({
    controllers: controllers,
  });

  return server;
};
