import { Container } from "typedi";

const ProjectContainerSymbol = Symbol();

export const ProjectContainer = Container.of(ProjectContainerSymbol as any);
