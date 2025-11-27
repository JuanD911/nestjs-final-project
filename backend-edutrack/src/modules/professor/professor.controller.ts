import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('professor')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('Admin')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post('createProfessor')
  create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorService.createProfessor(createProfessorDto);
  }

  @Get()
  findAll() {
    return this.professorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professorService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessorDto: UpdateProfessorDto) {
    return this.professorService.update(id, updateProfessorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professorService.remove(id);
  }
}
