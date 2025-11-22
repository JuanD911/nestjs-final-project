import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class StudentService {

  private readonly logger = new Logger('StudentService');

  constructor(

    @InjectRepository(StudentEntity)
    private readonly StudentRepository: Repository<StudentEntity>

  ){}

  async createStudent(createStudentDto: CreateStudentDto) {
    try{
      const student = this.StudentRepository.create(createStudentDto);
      await this.StudentRepository.save(student);

      return {
        message: "Student was succesfully saved", student
      }
    } catch(error){
        this.handlerErrors(error);
    }
  }

  async findAll() {
    try {
      return await this.StudentRepository.find();
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async findOneById(id: string) {
    if(!isUUID(id)) throw new BadRequestException('The search term entered is not a valid ID');

    try{
      const student = await this.StudentRepository.findOne({
        where: {id},
        relations: ['user', 'enrollments']
      });
      
      if(!student) throw new NotFoundException(`Student with id ${id} not found`);

      return student;
    }catch(error){
      this.handlerErrors(error.message);
    }
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.StudentRepository.preload({
      id: id,
      ...updateStudentDto
    });

    if(!student){
      throw new NotFoundException(`Student with id ${id} not found`);
    }

    try{
      await this.StudentRepository.save(student);
      return {
        message: `The student with id ${id} was succesfully updated`, student
      }
    } catch(error){
      this.handlerErrors(error);
      }
  }

  async remove(id: string) {
    const user = await this.StudentRepository.findOne({ where: { id } });

    if (!user)
      throw new NotFoundException(`Student with id ${id} not found`);

    try {
      await this.StudentRepository.remove(user);
      return `Student with id ${id} has been deleted`;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  handlerErrors(error: any){
    this.logger.error(error.message);
    throw new BadRequestException(error.message);
  }
}
