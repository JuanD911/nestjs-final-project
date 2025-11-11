import { Type } from "class-transformer";
import { IsNumber, IsObject, IsOptional } from "class-validator";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";

export class CreateStudentDto {

    @IsOptional()
    @IsNumber()
    entry_year: number;

    @IsOptional()
    @Type(() => CreateUserDto)
    user: CreateUserDto;

}
