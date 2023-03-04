import { Module, TypeOrmModule, NestConfig } from '@nest_rabbit/nest';
import { TrialEntity } from '../../core/trial/trial.entity';
import { UserEntity } from '../../core/user/user.entity';
import { dbConfig } from '../config/config';
import { CreateUser1677918781513 } from './migrations/1677918781513-create-user';

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
        entities: [UserEntity],
        migrations: [CreateUser1677918781513],
        synchronize: false,
        migrationsRun: true,
      }),
    })],
})
export class DatabaseModule {}
