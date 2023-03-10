import { Module, NestConfig, TypeOrmModule } from '@nest_rabbit/nest';
import { Queues, RabbitModule } from '@nest_rabbit/rabbit';
import { CheckEntity } from './src/core/check/check.entity';
import { rabbitConfig } from './src/modules/config/config';
import { ConfigModule } from './src/modules/config/config-module';
import { DatabaseModule } from './src/modules/database/database-module';
import { CheckController } from './src/usecases/check/check.controller';
import { CheckUsecase } from './src/usecases/check/check.usecase';

@Module({
    imports: [
        RabbitModule.forRoot({
            inject: [rabbitConfig.KEY],
            // eslint-disable-next-line max-len
            useFactory: (opts: NestConfig.ConfigType<typeof rabbitConfig>) => ({
                amqpUrl: opts.amqpUrl,
                queues: Object.keys(Queues),
            }),
        }),
        ConfigModule,
        DatabaseModule,
        TypeOrmModule.forFeature([CheckEntity]),
    ],
    controllers: [CheckController],
    providers: [CheckUsecase],
})
export class AppModule {}
