import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function initSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Users')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initSwagger(app);

  await app.listen(3000);
}
bootstrap();
