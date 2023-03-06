import { Module, NestConfig } from '@nest_rabbit/nest';
import { dbConfig, promConfig } from './config';

@Module({
  imports: [NestConfig.ConfigModule.forRoot(
    {
      isGlobal: true,
      cache: true,
      load: [dbConfig, promConfig],
    },
  )],
})
export class ConfigModule {}
