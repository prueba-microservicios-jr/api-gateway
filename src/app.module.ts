import { Module } from '@nestjs/common';
import { PokemonsModule } from './pokemons/pokemons.module';
import { TrainnersModule } from './trainners/trainners.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PokemonsModule, TrainnersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
