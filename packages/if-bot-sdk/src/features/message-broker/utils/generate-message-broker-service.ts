import { IFRondoniaBotSDK } from "../../../IFRondoniaBotSDK";
import { IMessageBrokerService } from "../interfaces";
import * as brokers from "./brokers";

export const generateMessageBrokerService = (
  host: IFRondoniaBotSDK
): IMessageBrokerService => new brokers.rabbitMQ.RabbitMQMessageBroker(host);
