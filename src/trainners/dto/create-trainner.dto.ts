import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateTrainnerDto {

    @IsString()
    public name: string;

    @IsString()
    public city: string;

    @IsNumber({
        maxDecimalPlaces: 0,
    })
    @IsPositive()
    @Min(1)
    @Type(() => Number)
    public age: number;
}
