import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bodyParser: true });
  app.setGlobalPrefix(process.env.API_PREFIX);

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  app.useStaticAssets(join(__dirname, '..', 'public'))
  await app.listen(process.env.SERVER_PORT).then(() => {
    console.log(`Server is running at ${process.env.SERVER_PORT}`)});
}
bootstrap();
