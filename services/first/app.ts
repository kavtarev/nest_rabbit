import {
  APP_PIPE, Module, TypeOrmModule, ValidationPipe,
} from '@nest_rabbit/nest';
import { UserEntity } from './src/core/user/user.entity';
import { ConfigModule } from './src/modules/config/config-module';
import { DatabaseModule } from './src/modules/database/database-module';
import { CreateUserController } from './src/usecases/create-user/create-user.controller';
import { CreateUserUsecase } from './src/usecases/create-user/create-user.usecase';

@Module({
  imports: [ConfigModule, DatabaseModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [CreateUserController],
  providers: [CreateUserUsecase, {
    provide: APP_PIPE,
    useFactory: () => new ValidationPipe(),
  }],
})
export class AppModule {}
