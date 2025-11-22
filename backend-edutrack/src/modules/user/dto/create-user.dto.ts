import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserTypes } from "../interfaces/userTypes";

export class CreateUserDto {

    @IsString()
    full_name: string;

    @IsEmail()
    email: string

    @MinLength(8)
    @IsString()
    password: string;

    @IsEnum(UserTypes)
    role: UserTypes;
}