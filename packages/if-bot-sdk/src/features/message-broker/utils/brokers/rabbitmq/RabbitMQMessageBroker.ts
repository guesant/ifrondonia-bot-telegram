import { tryParseJSON } from "@ifrondonia-bot-telegram/shared/lib/features/utils/try-parse-json";
import { Channel, connect, Connection } from "amqplib";
import { Logger } from "winston";
import { IFRondoniaBotSDK } from "../../../../../IFRondoniaBotSDK";
import {
  IMessageBrokerListenOptions,
  IMessageBrokerSendOptions,
  IMessageBrokerService,
} from "../../../interfaces";

export class RabbitMQMessageBroker implements IMessageBrokerService {
  conn!: Connection;

  channel!: Channel;

  logger: Logger;

  #isStopping = false;

  constructor(host: IFRondoniaBotSDK) {
    this.logger = host.logger.child({});
  }

  async setup(RABBITMQ_URI = process.env.RABBITMQ_URI) {
    if (!RABBITMQ_URI) {
      this.logger.error("The 'RABBITMQ_URI' is not set or it is invalid.");
      process.exit(1);
    }

    this.logger.debug(
      `Starting an amqp connection to the RabbitMQ instance...`
    );

    try {
      this.conn = await connect(RABBITMQ_URI);
    } catch (error) {
      this.logger.error({
        message: `Can't connect to the RabbitMQ instance.`,
      });
      throw error;
    }

    this.logger.debug({
      message: `Sucessfull connection. Creating a new channel...`,
    });

    try {
      this.channel = await this.conn.createChannel();
    } catch (error) {
      this.logger.error({
        message: `Can't create a new channel.`,
      });
      throw error;
    }

    this.logger.debug({
      message: `Channel created sucessfully. Message Broker Service started.`,
    });
  }

  async stop() {
    if (this.#isStopping) {
      return;
    }

    this.logger.debug("Stopping the Message Broker Service.");

    this.#isStopping = true;

    await this.channel.close();

    await this.conn.close();

    this.#isStopping = false;
  }

  async send(options: IMessageBrokerSendOptions) {
    const { message = {}, queue } = options;

    await this.channel.assertQueue(queue);

    try {
      this.logger.debug({
        message: `Sending a message to the queue "${queue}".`,
        args: { queue },
      });

      if (queue.startsWith("data.") || queue.startsWith("event-tick.")) {
        await this.channel.purgeQueue(queue);
      }

      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      this.logger.error({
        message: `Cloud not send a message to the queue "${queue}".`,
        args: { message, queue, error },
      });
      throw error;
    }
  }

  async listen(options: IMessageBrokerListenOptions) {
    const { queue, callback } = options;

    await this.channel.assertQueue(queue);

    const { consumerTag } = await this.channel.consume(queue, async (msg) => {
      if (msg) {
        const id = msg.properties.messageId;

        const data = tryParseJSON(msg.content.toString());

        const ack = await callback({ id, data });

        if (ack ?? true) {
          this.channel.ack(msg);
        }
      }
    });

    this.logger.debug({
      message: `Listening on queue ${queue}.`,
      args: { queue, consumerTag },
    });

    return async () => {
      try {
        await this.channel.cancel(consumerTag);
      } catch (error) {}

      this.logger.debug({
        message: `No longer listening on queue ${queue}.`,
        args: { queue, consumerTag },
      });
    };
  }
}
