import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common"
import { Model, isValidObjectId } from "mongoose"
import { Pokemon } from "./entities/pokemon.entity"
import { CreatePokemonDto } from "./dto/create-pokemon.dto"
import { UpdatePokemonDto } from "./dto/update-pokemon.dto"
import { InjectModel } from "@nestjs/mongoose"

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)

      return pokemon
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
        )
      }
      console.log(error)
      throw new InternalServerErrorException(
        `Can't create Pokemon - Check server logs`,
      )
    }
  }

  findAll() {
    return `This action returns all pokemon`
  }

  async findOne(term: string) {
    let pokemon: Pokemon

    // Verificación por número de Pokemon
    if (!isNaN(+term))
      pokemon = await this.pokemonModel.findOne({ numberPokemon: term })

    // Verificación por ObjectId de Pokemon en Mongo
    if (!pokemon && isValidObjectId(term))
      pokemon = await this.pokemonModel.findById(term)

    // Verificación por nombre de Pokemon
    if (!pokemon)
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      })

    // Si el Pokemon no fue encontrado
    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or number of Pokemon ${term} not found`,
      )
    return pokemon
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`
  }
}
