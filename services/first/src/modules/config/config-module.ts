import { Module, NestConfig } from '@nest_rabbit/nest';
import { dbConfig, promConfig, rabbitConfig } from './config';

@Module({
    imports: [
        NestConfig.ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [dbConfig, promConfig, rabbitConfig],
        }),
    ],
})
export class ConfigModule {}
