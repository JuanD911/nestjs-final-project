import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Repository } from 'typeorm';
import { ProfessorEntity } from './entities/professor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class ProfessorService {

  private readonly logger = new Logger('ProfessorService');

  constructor(

    @InjectRepository(ProfessorEntity)
    private readonly ProfessorRepository: Repository<ProfessorEntity>

  ){}

  async createProfessor(createProfessorDto: CreateProfessorDto) {
    try{
      const professor = this.ProfessorRepository.create(createProfessorDto);
      await this.ProfessorRepository.save(professor);

      return {
        message: "Professor was succesfully saved", professor
      }
    } catch(error){
        this.handlerErrors(error);
    }
  }

  async findAll() {
    try {
      return await this.ProfessorRepository.find({
        relations: ['user', 'courses']
      });
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async findOneById(id: string) {
    if(!isUUID(id)) throw new BadRequestException('The search term entered is not a valid ID');

    try{
      const professor = await this.ProfessorRepository.findOne({
        where: {id},
        relations: ['user', 'courses']
      });
      
      if(!professor) throw new NotFoundException(`Professor with id ${id} not found`);

      return professor;
    }catch(error){
      this.handlerErrors(error.message);
    }
  }

  async update(id: string, updateProfessorDto: UpdateProfessorDto) {
    const professor = await this.ProfessorRepository.preload({
      id: id,
      ...updateProfessorDto
    });

    if(!professor){
      throw new NotFoundException(`Professor with id ${id} not found`);
    }

    try{
      await this.ProfessorRepository.save(professor);
      return {
        message: `The Professor with id ${id} was succesfully updated`, professor
      }
    } catch(error){
      this.handlerErrors(error);
      }
  }

  async remove(id: string) {
    const user = await this.ProfessorRepository.findOne({ where: { id } });

    if (!user)
      throw new NotFoundException(`Professor with id ${id} not found`);

    try {
      await this.ProfessorRepository.remove(user);
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
