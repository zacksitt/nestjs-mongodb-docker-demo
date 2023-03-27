import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    password: string;

}