import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:4200", // Angular dev server
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  }); //made my backend accessible from angular dev server

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  ); //mnghir hedhy el body mch bch yekho  tinstance mn addtasktdo
  //whitelist attribut li aandi yetkeblo-------------------------
  //forbidnonwhitelisted ay attribut zeyed yekebloush
  await app.listen(3000);
}
bootstrap();
