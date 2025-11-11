import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsUUID, Max, Min } from "class-validator";

export class CreateEnrollmentDto {

    @IsOptional()
    @IsDateString()
    enrollmentDate: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    grade: number;

    @IsNotEmpty()
    @IsUUID()
    studentId: string;

    @IsNotEmpty()
    @IsUUID()
    courseId: string;
    
}
