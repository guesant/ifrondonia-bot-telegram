import { IFRondoniaBotSDK } from "../../../IFRondoniaBotSDK";
import { IMessageBrokerService } from "./IMessageBrokerService";

export interface IMessageBrokerServiceStatic {
  new (host: IFRondoniaBotSDK): IMessageBrokerService;
}
