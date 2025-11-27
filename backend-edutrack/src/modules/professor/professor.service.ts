import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Repository } from 'typeorm';
import { ProfessorEntity } from './entities/professor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ProfessorService {

  private readonly logger = new Logger('ProfessorService');

  constructor(
    @InjectRepository(ProfessorEntity)
    private readonly professorRepository: Repository<ProfessorEntity>
  ){}

  async createProfessor(createProfessorDto: CreateProfessorDto) {
    try{
      const professor = this.professorRepository.create(createProfessorDto);
      await this.professorRepository.save(professor);

      return {
        message: "Professor successfully saved",
        professor
      };
    } catch(error){
      this.handlerErrors(error);
    }
  }

  async findAll() {
    try {
      return await this.professorRepository.find({
        relations: ['user', 'courses']
      });
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async findOneById(id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid ID');

    try {
      const professor = await this.professorRepository.findOne({
        where: { id },
        relations: ['user', 'courses']
      });

      if (!professor) throw new NotFoundException(`Professor with id ${id} not found`);

      return professor;
    } catch(error){
      this.handlerErrors(error);
    }
  }

  async update(id: string, dto: UpdateProfessorDto) {
    const professor = await this.professorRepository.findOne({
      where: { id },
      relations: ['user']
    });

    if (!professor)
      throw new NotFoundException(`Professor with id ${id} not found`);

    if (dto.specialty !== undefined)
      professor.specialty = dto.specialty;

    if (dto.user) {
      const { full_name, email, password, role } = dto.user;

      if (full_name !== undefined) professor.user.full_name = full_name;
      if (email !== undefined) professor.user.email = email;
      if (role !== undefined) professor.user.role = role;

      if (password !== undefined && password.trim() !== "") {
        professor.user.password = await bcrypt.hash(password, 12);
      }
    }

    try {
      await this.professorRepository.manager.save(professor.user);
      await this.professorRepository.save(professor);

      return {
        message: `Professor updated successfully`,
        professor
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }


  async remove(id: string) {
    const professor = await this.professorRepository.findOne({ where: { id } });

    if (!professor)
      throw new NotFoundException(`Professor with id ${id} not found`);

    try {
      await this.professorRepository.remove(professor);
      return `Professor with id ${id} has been deleted`;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  handlerErrors(error: any){
    this.logger.error(error.message);
    throw new BadRequestException(error.message);
  }
}
