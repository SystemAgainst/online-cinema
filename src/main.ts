import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({ origin: 'http://localhost:3000' });
	app.setGlobalPrefix('api/v1');
	await app.listen(process.env.PORT);
}

bootstrap();
