import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, OnModuleInit, Res, Query } from '@nestjs/common';
import { CreateTrainnerDto } from './dto/create-trainner.dto';
import { UpdateTrainnerDto } from './dto/update-trainner.dto';
import { evns } from 'src/config';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { Response } from 'express';
import { PaginationDto } from 'src/common';

interface TrainnersService {
  GetData(data: { id: string }): Observable<{ message: string }>;
  GetTrainners(data: { page: number, limit: number }): Observable<{ message: string }>;
  CreateTrainner(data: CreateTrainnerDto): Observable<{ message: string }>;
  UpdateTrainner(data: UpdateTrainnerDto): Observable<{ message: string }>;
  DeleteTrainner(data: { id: number}): Observable<{ message: string }>;
}

@Controller('trainners')
export class TrainnersController implements OnModuleInit {

	private trainnersGrcp: TrainnersService;

	constructor(@Inject(evns.trainner_ms_name) private readonly trainnerMs:ClientGrpc) {}

	onModuleInit() {
		this.trainnersGrcp = this.trainnerMs.getService<TrainnersService>('TrainnersService');
	}

	@Post()
	async create(@Res() res: Response,@Body() createTrainnerDto: CreateTrainnerDto) {

		try{
			const response = await this.trainnersGrcp.CreateTrainner(createTrainnerDto).toPromise();

			const data = JSON.parse(response.message);

			return res.status(201).json({status:true,data:data});
			
		}catch (error) {
			throw new Error('Ocurrio un error '+error);
		}
		
	}

	@Get()
	async findAll(@Res() res: Response,@Query() paginationDto: PaginationDto) {

		try{
			const response = await this.trainnersGrcp.GetTrainners(paginationDto).toPromise();

			const data = JSON.parse(response.message);

			return res.status(200).json({status:true,data:data});
			
		}catch (error) {
			throw new Error('Ocurrio un error '+error);
		}
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return false;
	}

	@Patch()
	async update(@Res() res: Response,@Body() updateTrainnerDto: UpdateTrainnerDto) {
		
		try{
			const response = await this.trainnersGrcp.UpdateTrainner(updateTrainnerDto).toPromise();

			const data = JSON.parse(response.message);

			return res.status(200).json({status:true,data:data});
			
		}catch (error) {
			throw new Error('Ocurrio un error '+error);
		}
	}

	@Delete(':id')
	async remove(@Res() res: Response,@Param('id') id: string) {
		try{
			await firstValueFrom(this.trainnersGrcp.DeleteTrainner({ id: parseInt(id) }));

			return res.status(200).json({status:true});
			
		}catch (error) {
			throw new Error('Ocurrio un error '+error.message);
		}
	}
}
