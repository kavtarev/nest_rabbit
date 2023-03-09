import { Injectable } from '@nest_rabbit/nest';
import { AmqpConnectionManager, ChannelWrapper, connect } from 'amqp-connection-manager';

@Injectable()
export class Connection {
  connection: AmqpConnectionManager;

  channel: ChannelWrapper;

  amqpUrl: string;

  constructor({ amqpUrl }:{ amqpUrl: string }) {
    this.amqpUrl = amqpUrl;
  }

  async init() {
    this.connection = connect(this.amqpUrl);

    this.channel = await this.connection.createChannel({
      json: true,
      setup: function (channel) {
        // `channel` here is a regular amqplib `ConfirmChannel`.
        // Note that `this` here is the channelWrapper instance.
        // return channel.assertQueue('some', { durable: true });
      },
    });

    return this.channel;
  }
}
