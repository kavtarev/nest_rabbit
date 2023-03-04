import { Module, TypeOrmModule, NestConfig } from '@nest_rabbit/nest';
import { CheckEntity } from '../../core/check/check.entity';
import { dbConfig } from '../config/config';
import { Init1677919599044 } from './migrations/1677919599044-Init';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [dbConfig.KEY],
      // @ts-ignore
      useFactory: (config: NestConfig.ConfigType<typeof dbConfig>) => ({
        type: 'postgres',
        host: config.host,
        port: config.port,
        database: config.database,
        username: config.username,
        password: config.password,
        entities: [CheckEntity],
        migrations: [Init1677919599044],
        migrationsRun: true,
        synchronize: false,
      }),
    })],
})
export class DatabaseModule {}
