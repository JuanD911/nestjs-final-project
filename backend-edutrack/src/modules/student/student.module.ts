import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentEntity } from './entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [TypeOrmModule],
})
export class StudentModule {}
