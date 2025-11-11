import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { ProfessorEntity } from './entities/professor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorEntity])],
  controllers: [ProfessorController],
  providers: [ProfessorService],
  exports: [TypeOrmModule],
})
export class ProfessorModule {}
