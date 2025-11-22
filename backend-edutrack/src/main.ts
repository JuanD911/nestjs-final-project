import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PATCH,DELETE,UPDATE',
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    exceptionFactory: (errors) => {
    console.error("🔥 VALIDATION ERRORS:", errors);
      return new BadRequestException(errors);
    }
  }));



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
