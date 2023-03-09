import { DynamicModule, FactoryProvider, Module } from '@nest_rabbit/nest';
import { OPTIONS, CONNECTION, CHANNEL } from './constants';
import { Channel } from './channel';
import { Connection } from './connection';

@Module({})
export class RabbitModule {
  static forRoot(options: Omit<FactoryProvider<Promise<any> | any>, 'provide'>): DynamicModule {
    return {
      module: RabbitModule,
      global: true,
      providers: [
        { provide: OPTIONS, useFactory: options.useFactory, inject: options.inject || [] },
        {
          provide: CONNECTION,
          useFactory: (opts: any) => new Connection({ amqpUrl: opts.amqpUrl }),
          inject: [OPTIONS],
        },
        {
          provide: CHANNEL,
          useFactory: async (connection: Connection, opts: any) => {
            const channel = new Channel();
            await channel.connect(connection);
            await channel.assertQueues(opts.queues);
            return channel;
          },
          inject: [CONNECTION, OPTIONS],
        },
      ],
      exports: [CHANNEL],
    };
  }
}
