import { UsersPreferencesServiceClient } from "./users-preferences/UsersPreferencesServiceClient";
import { IFRondoniaBotSDK } from "../../IFRondoniaBotSDK";

export class MSClientsService {
  constructor(readonly host: IFRondoniaBotSDK) {}

  usersPreferences = new UsersPreferencesServiceClient();

  async setup() {
    await this.usersPreferences.setup();
  }

  async stop() {
    await this.usersPreferences.stop();
  }
}
