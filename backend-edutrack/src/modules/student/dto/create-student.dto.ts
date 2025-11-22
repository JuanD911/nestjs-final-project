import { Type } from "class-transformer";
import { IsNumber, IsObject, IsOptional, ValidateNested } from "class-validator";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";

export class CreateStudentDto {

    @IsNumber()
    @Type(() => Number)
    entryYear: number;

    @ValidateNested()
    @Type(() => CreateUserDto)
    user: CreateUserDto;

}
