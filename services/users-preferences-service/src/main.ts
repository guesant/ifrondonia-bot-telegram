import "reflect-metadata";
import { UsersPreferencesService } from "./UsersPreferencesService";
import { Container } from "typedi";

const usersPreferencesService = Container.get(UsersPreferencesService);

usersPreferencesService.start();
