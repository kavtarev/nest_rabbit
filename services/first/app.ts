import { MetricsModule } from '@nest_rabbit/metrics';

import {
  APP_PIPE, DiscoveryModule, Module, NestConfig, TypeOrmModule, ValidationPipe,
} from '@nest_rabbit/nest';
import { Queues, RabbitModule } from '@nest_rabbit/rabbit';
import { UserEntity } from './src/core/user/user.entity';
import { promConfig, rabbitConfig } from './src/modules/config/config';
import { ConfigModule } from './src/modules/config/config-module';
import { DatabaseModule } from './src/modules/database/database-module';
import { CreateUserController } from './src/usecases/create-user/create-user.controller';
import { CreateUserUsecase } from './src/usecases/create-user/create-user.usecase';
import { RunMeta } from './src/usecases/create-user/runmeta';
import { VerifyUserUsecase } from './src/usecases/verify-user/verify-user.usecase';

@Module({
  imports: [
    RabbitModule.forRoot({
      inject: [rabbitConfig.KEY],
      // eslint-disable-next-line max-len
      useFactory: (opts: NestConfig.ConfigType<typeof rabbitConfig>) => ({ amqpUrl: opts.amqpUrl, queues: Object.keys(Queues) }),
    }),
    DiscoveryModule,
    ConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([UserEntity]),
    MetricsModule.forRoot({
      inject: [promConfig.KEY],
      useFactory: (opts: NestConfig.ConfigType<typeof promConfig>) => ({
        disabled: opts.disabled?.toLowerCase() === 'true',
        port: +opts.port,
      }),
    }),
  ],
  controllers: [CreateUserController],
  providers: [CreateUserUsecase, {
    provide: APP_PIPE,
    useFactory: () => new ValidationPipe(),
  }, RunMeta, VerifyUserUsecase],
})
export class AppModule {}
