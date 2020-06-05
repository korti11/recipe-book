/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";

import { AppModule } from "./app/app.module";
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port: number = parseInt(process.env.PORT, 10) || 8080;
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: "127.0.0.1",
      port: port
    }
  });
  app.listen(() => Logger.log(`Recipe microservice is listening on port: ${port}`));
}

bootstrap();
