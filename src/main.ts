import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that are not in DTO
      forbidNonWhitelisted: true, // Throw error if extra fields are sent
      transform: true, // Auto-transform to DTO class
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
