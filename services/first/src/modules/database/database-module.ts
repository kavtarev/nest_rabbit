import { Module, TypeOrmModule, NestConfig } from '@nest_rabbit/nest';
import { TrialEntity } from '../../core/trial/trial.entity';
import { dbConfig } from '../config/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [dbConfig.KEY],
      // @ts-ignore
      useFactory: (config: NestConfig.ConfigType<typeof dbConfig>) => ({
        type: 'postgres',
        host: config.host,
        port: +config.port,
        database: config.database,
        username: config.username,
        password: config.password,
        entities: [TrialEntity],
        synchronize: true,
      }),
    })],
})
export class DatabaseModule {}
