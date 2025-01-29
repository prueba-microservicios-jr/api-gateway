import { Module } from '@nestjs/common';
import { TrainnersController } from './trainners.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { evns } from 'src/config';
import { join } from 'path';

@Module({
  imports: [
      ClientsModule.register([
        { 
          name: evns.trainner_ms_name, 
          transport: Transport.GRPC, 
          options: { 
            package: 'trainners',
            protoPath: join(__dirname, '../protos/trainners.proto'),
            url: 'localhost:3002', // Dirección del servidor gRPC en Go
          } 
        },
      ]),
    ],
  controllers: [TrainnersController],
  providers: [],
})
export class TrainnersModule {}
