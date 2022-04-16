import { Container } from "typedi";

const ProjectContainerSymbol = Symbol(
  "@ifrondonia-bot-telegram/users-preferences-service"
);

export const ProjectContainer = Container.of(ProjectContainerSymbol as any);
