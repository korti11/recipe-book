/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, INestMicroservice } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";
import { Transport } from "@nestjs/common/enums/transport.enum";

async function bootstrap() {
  const port: number = parseInt(process.env.PORT, 10) || 3333;
  const app: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: port
    }
  });
  app.listen(() => console.log(`Recipe microservice is listening on port: ${port}`));
}

bootstrap();
