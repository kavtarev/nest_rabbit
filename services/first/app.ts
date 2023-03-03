import { Module } from '@nest_rabbit/nest';
import { TrialModuleController } from './src/usecases/trial-module/trial-module.controller';

@Module({
  controllers: [TrialModuleController],
})
export class AppModule {}
