import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3450);
  app.enableCors(); // Autorise les requêtes venant d'autres domaines, comme votre frontend
}
bootstrap();
