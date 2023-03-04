import { Module, TypeOrmModule, NestConfig } from '@nest_rabbit/nest';
import { UserEntity } from '../../core/user/user.entity';
import { dbConfig } from '../config/config';
import { CreateUser1677918781513 } from './migrations/1677918781513-create-user';
import { AddCheckPassed1677920812623 } from './migrations/1677920812623-AddCheckPassed';

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
        migrations: [CreateUser1677918781513, AddCheckPassed1677920812623],
        synchronize: false,
        migrationsRun: true,
      }),
    })],
})
export class DatabaseModule {}
