import { NestFactory } from '@nest_rabbit/nest';
import { AppModule } from './app';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.listen(3001);
}

main();
