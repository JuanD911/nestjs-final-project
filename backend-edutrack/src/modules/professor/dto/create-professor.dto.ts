import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";

export class CreateProfessorDto {

    @IsOptional()
    @IsString()
    specialty: string;

    @IsOptional()
    @Type(() => CreateUserDto)
    user: CreateUserDto;
}
