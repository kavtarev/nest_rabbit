import { Module, TypeOrmModule } from '@nest_rabbit/nest';
import { CheckEntity } from './src/core/check/check.entity';
import { ConfigModule } from './src/modules/config/config-module';
import { DatabaseModule } from './src/modules/database/database-module';
import { CheckController } from './src/usecases/check/check.controller';
import { CheckUsecase } from './src/usecases/check/check.usecase';

@Module({
  imports: [ConfigModule, DatabaseModule, TypeOrmModule.forFeature([CheckEntity])],
  controllers: [CheckController],
  providers: [CheckUsecase],
})
export class AppModule {}
