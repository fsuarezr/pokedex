import { join } from "path"
import { Module } from "@nestjs/common"
import { ServeStaticModule } from "@nestjs/serve-static"

import { CoreModule } from "./core/core.module"
import { PokemonModule } from "./pokemon/pokemon.module"
import { CommonModule } from "./common/common.module"
import { SeedModule } from "./seed/seed.module"

@Module({
  imports: [
    CoreModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, `..`, `public`),
    }),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
})
export class AppModule {}
