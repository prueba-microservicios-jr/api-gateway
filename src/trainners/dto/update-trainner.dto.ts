import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainnerDto } from './create-trainner.dto';
import { IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTrainnerDto extends PartialType(CreateTrainnerDto) {

    @IsPositive()
	@Min(1)
    @Type(() => Number)
    public id: number
}
