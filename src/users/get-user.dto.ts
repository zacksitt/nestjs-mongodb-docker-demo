import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class GetUserDto {
    
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    password: string;

}