import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class CreateCourseDto {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    credits: number;

    @IsOptional()
    @IsUUID()
    @IsNotEmpty()
    professor_id: string;
}
