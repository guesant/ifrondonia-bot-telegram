import "reflect-metadata";
import { ProjectContainer } from "./misc/di-container";
import { UsersPreferencesService } from "./UsersPreferencesService";

const usersPreferencesService = ProjectContainer.get(UsersPreferencesService);

usersPreferencesService.start();
