import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateClassDto {
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly description: string;

}