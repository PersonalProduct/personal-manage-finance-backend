import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
  app.setGlobalPrefix('api/v1.0', { exclude: [''] });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
