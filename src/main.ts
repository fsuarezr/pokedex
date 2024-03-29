import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Obteniendo variables de entorno
  const configService = app.get(ConfigService)
  const port = configService.get(`api.port`)
  const prefix = configService.get(`api.prefix`)

  app.setGlobalPrefix(prefix)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  await app.listen(port)
  console.log(`App running on port: ${port}`)
}

bootstrap()
