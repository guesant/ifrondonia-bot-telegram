import { Container } from "typedi";

const ProjectContainerSymbol = Symbol("@ifrondonia-bot-telegram/bot-service");

export const ProjectContainer = Container.of(ProjectContainerSymbol as any);
