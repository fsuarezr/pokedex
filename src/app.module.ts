import { join } from "path"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { ServeStaticModule } from "@nestjs/serve-static"
import { MongooseModule } from "@nestjs/mongoose"

import { PokemonModule } from "./pokemon/pokemon.module"
import { CommonModule } from "./common/common.module"
import { SeedModule } from "./seed/seed.module"
import { EnvConfiguration } from "./config/app.config"

import { getMongoDBConnection } from "./common/adapters/mongo.adapter"

console.log(getMongoDBConnection())

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, `..`, `public`),
    }),

    MongooseModule.forRoot(`mongodb://fslashh:HalaMadrid14@localhost`),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
})
export class AppModule {}
