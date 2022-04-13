import "reflect-metadata";
import { ProjectContainer } from "./misc/di-container";
import { UsersPreferencesService } from "./users-preferences.service";

const usersPreferencesService = ProjectContainer.get(UsersPreferencesService);

usersPreferencesService.start();
