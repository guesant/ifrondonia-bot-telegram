import { IFRondoniaBotSDK } from "../../IFRondoniaBotSDK";

export class MSClientsService {
  constructor(readonly host: IFRondoniaBotSDK) {}

  async setup() {
    await this.usersPreferences.setup();
  }
}
