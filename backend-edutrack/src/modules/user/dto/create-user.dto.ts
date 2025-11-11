import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserTypes } from "../interfaces/userTypes";

export class CreateUser {

    @IsString()
    @IsOptional()
    full_name: string;

    @IsOptional()
    @IsEmail()
    correo: string

    @IsOptional()
    @MinLength(8)
    @IsString()
    password: string;

    @IsEnum(UserTypes)
    @IsOptional()
    role: UserTypes;
}