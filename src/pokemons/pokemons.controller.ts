import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, BadRequestException, Res } from '@nestjs/common';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { evns } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { firstValueFrom } from 'rxjs';
import { Response } from 'express';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(@Inject(evns.pokemon_ms_name) private readonly pokemonsMs:ClientProxy) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonsMs.send({ cmd: 'create_pokemon' }, createPokemonDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    //console.log("HOLA GET");
    return this.pokemonsMs.send({ cmd: 'get_all_pokemons' }, paginationDto);
    //return false;
  }

  @Get('total')
  async findTotal(@Res() res: Response) {

    try{
      const total = await firstValueFrom(this.pokemonsMs.send({ cmd: 'get_total_pokemons' }, {}));

      res.status(200).json({total:total,status:true});
      return total;

    }catch(e){
      throw new BadRequestException(e);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    try{

      const pokemon = await firstValueFrom(this.pokemonsMs.send({ cmd: 'get_one_pokemon' }, { id }));

      return pokemon

    }catch(e){
      throw new BadRequestException(e);
    }
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto) {
  
    return this.pokemonsMs.send({ cmd: 'update_pokemon' }, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonsMs.send({ cmd: 'delete_pokemon' }, {id});
  }

  @Delete('delete/all')
  async removeAll(@Res() res: Response) {

    try{
      
      await firstValueFrom(this.pokemonsMs.send({ cmd: 'delete_all_pokemon' }, { }));

      res.status(200).json({status:true});

    }catch(e){
      throw new BadRequestException(e);
    }
    
  }

  @Get('execute/migrate')
  async migrate(@Res() res: Response){

    try{
      
      await firstValueFrom(this.pokemonsMs.send({ cmd: 'execute_migrate_pokemon' }, {}));

      res.status(200).json({status:true});

    }catch(e){
      throw new BadRequestException(e);
    }
  }
}
