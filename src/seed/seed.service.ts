import axios, { AxiosInstance } from "axios"
import { Injectable } from "@nestjs/common"
import { PokeResponse } from "./interfaces/poke-response.interface"
import { PokemonService } from "src/pokemon/pokemon.service"

@Injectable()
export class SeedService {
  constructor(private readonly pokemonService: PokemonService) {}
  private readonly axios: AxiosInstance = axios

  async executeSeed() {
    //Limpiamos la data de la BD
    this.pokemonService.clearPokemonCollection()

    // Armamos el request para insertar en BD
    const { data } = await this.axios.get<PokeResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=150`,
    )

    const pokemonToDB = []

    data.results.forEach(({ name, url }) => {
      const segments = url.split(`/`)
      const numberPokemon: number = +segments[segments.length - 2]

      pokemonToDB.push({ name, numberPokemon })
    })

    this.pokemonService.massiveInsertions(pokemonToDB)

    return `Seed executed. ${data.results.length} pokemons were created on Database`
  }
}
