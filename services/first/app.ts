import { MetricsModule } from '@nest_rabbit/metrics';

import {
  APP_PIPE, Module, NestConfig, TypeOrmModule, ValidationPipe,
} from '@nest_rabbit/nest';
import { UserEntity } from './src/core/user/user.entity';
import { promConfig } from './src/modules/config/config';
import { ConfigModule } from './src/modules/config/config-module';
import { DatabaseModule } from './src/modules/database/database-module';
import { CreateUserController } from './src/usecases/create-user/create-user.controller';
import { CreateUserUsecase } from './src/usecases/create-user/create-user.usecase';

@Module({
  imports: [
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
  }],
})
export class AppModule {}
