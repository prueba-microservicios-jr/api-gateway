import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { evns } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

  app.enableCors();

  await app.listen(evns.port);
  console.log(`API gateway running on ${evns.port}`);
}
bootstrap();
