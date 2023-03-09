import { Logger } from '@nest_rabbit/nest';
import { ChannelWrapper } from 'amqp-connection-manager';
import { Channel as amqpChannel, ConsumeMessage } from 'amqplib';
import { Connection } from './connection';

export class Channel {
  logger = new Logger(Channel.name);

  channel:ChannelWrapper;

  async connect(connection: Connection) {
    this.channel = await connection.init();
  }

  async assertQueue(queue: string) {
    return this.channel.assertQueue(queue);
  }

  async publish(queue: string, content: unknown) {
    try {
      await this.channel.publish('', queue, content);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async assertQueues(queues: string[]) {
    try {
      await Promise.all(queues.map((q) => this.channel.addSetup((channel: amqpChannel) => {
        channel.assertQueue(q, { durable: true });
      })));
    } catch (e) {
      this.logger.error(e);
    }
  }

  async subscribe(queue: string, cb: (msg: ConsumeMessage) => void) {
    try {
      await this.channel.consume(queue, cb);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async ack(msg: ConsumeMessage) {
    this.channel.ack(msg);
  }
}
