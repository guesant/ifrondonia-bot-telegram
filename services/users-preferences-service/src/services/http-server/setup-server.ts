import { useContainer, createExpressServer } from "routing-controllers";
import Container from "typedi";
import { Express } from "express";
import { FeedsController } from "./feeds/feeds.controller";

const controllers = [
  FeedsController,
];

export const setupServer = (): Express => {
  useContainer(Container);

  const server = createExpressServer({
    controllers: controllers,
  });

  return server;
};
