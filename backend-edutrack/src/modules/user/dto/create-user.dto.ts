import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserTypes } from "../interfaces/userTypes";

export class CreateUserDto {

    @IsString()
    @IsOptional()
    full_name: string;

    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @MinLength(8)
    @IsString()
    password: string;

    @IsEnum(UserTypes)
    @IsOptional()
    role: UserTypes;
}