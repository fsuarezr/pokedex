import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { ConfigService } from "@nestjs/config"
import { Model, isValidObjectId } from "mongoose"
import { Pokemon } from "./entities/pokemon.entity"
import { CreatePokemonDto } from "./dto/create-pokemon.dto"
import { UpdatePokemonDto } from "./dto/update-pokemon.dto"
import { PaginationDto } from "src/common/dto/pagination.dto"

@Injectable()
export class PokemonService {
  private defaultLimit: number
  private defaultOffset: number

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>(`pagination.limit`)
    this.defaultOffset = configService.get<number>(`pagination.offset`)
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)

      return pokemon
    } catch (error) {
      this.handleMongoExceptions(error)
    }
  }

  findAll(queryParameters: PaginationDto) {
    const { limit = this.defaultLimit, offset = this.defaultOffset } =
      queryParameters

    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ numberPokemon: 1 })
      .select(`-__v`)
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

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term)

    const { name } = updatePokemonDto

    if (name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase()

    try {
      const pokemonUpdated = await this.pokemonModel.findByIdAndUpdate(
        pokemon._id,
        updatePokemonDto,
        { new: true },
      )

      return pokemonUpdated
    } catch (error) {
      this.handleMongoExceptions(error)
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id })

    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id: ${id} not found`)

    return deletedCount
  }

  async clearPokemonCollection() {
    try {
      await this.pokemonModel.deleteMany({})
    } catch (error) {
      this.handleMongoExceptions(error)
    }
  }

  async massiveInsertions(pokemons: Pokemon[]) {
    try {
      await this.pokemonModel.insertMany(pokemons)
    } catch (error) {
      this.handleMongoExceptions(error)
    }
  }

  private handleMongoExceptions(error) {
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
