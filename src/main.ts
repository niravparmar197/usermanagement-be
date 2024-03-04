/* eslint-disable prettier/prettier */
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { useContainer } from "class-validator";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  // enable DI for class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors(); // This enables CORS for all origins

  await app.listen(8080);
}
bootstrap();
