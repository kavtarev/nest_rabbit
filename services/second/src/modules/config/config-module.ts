import { Module, NestConfig } from '@nest_rabbit/nest';
import { dbConfig, rabbitConfig } from './config';

@Module({
  imports: [NestConfig.ConfigModule.forRoot(
    {
      isGlobal: true,
      cache: true,
      load: [dbConfig, rabbitConfig],
    },
  )],
})
export class ConfigModule {}
