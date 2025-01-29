import { Module } from '@nestjs/common';
import { PokemonsController } from './pokemons.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { evns } from 'src/config';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [
    ClientsModule.register([
      { name: evns.pokemon_ms_name, transport: Transport.TCP, options: { port: evns.pokemon_ms_port, host: evns.pokemon_ms_host } },
    ]),
    AuthModule
  ],
  controllers: [PokemonsController],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard, 
  },],
})
export class PokemonsModule {}
