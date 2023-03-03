import { Module, TypeOrmModule } from '@nest_rabbit/nest';
import { TrialEntity } from './src/core/trial/trial.entity';
import { ConfigModule } from './src/modules/config/config-module';
import { DatabaseModule } from './src/modules/database/database-module';
import { TrialController } from './src/usecases/trial-module/trial.controller';
import { TrialUsecase } from './src/usecases/trial-module/trial.usecase';

@Module({
  imports: [ConfigModule, DatabaseModule, TypeOrmModule.forFeature([TrialEntity])],
  controllers: [TrialController],
  providers: [TrialUsecase],
})
export class AppModule {}
