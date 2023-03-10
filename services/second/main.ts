import { NestFactory, ValidationPipe } from '@nest_rabbit/nest';
import { AppModule } from './app';

async function main() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.listen(3001);
}

main();
