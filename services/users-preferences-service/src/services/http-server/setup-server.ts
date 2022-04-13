import { useContainer, createExpressServer } from "routing-controllers";
import Container from "typedi";
import { Express } from "express";

export const setupServer = (): Express => {
  useContainer(Container);

  const server = createExpressServer({
    controllers: [],
  });

  return server;
};
