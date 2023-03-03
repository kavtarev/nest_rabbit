import { Module, NestConfig } from '@nest_rabbit/nest';
import { dbConfig } from './config';

@Module({
  imports: [NestConfig.ConfigModule.forRoot(
    {
      isGlobal: true,
      cache: true,
      load: [dbConfig],
    },
  )],
})
export class ConfigModule {}
