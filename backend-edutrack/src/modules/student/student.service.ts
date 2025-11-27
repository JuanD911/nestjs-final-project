import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StudentService {

  private readonly logger = new Logger('StudentService');

  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>
  ){}

  async createStudent(createStudentDto: CreateStudentDto) {
    try{
      const student = this.studentRepository.create(createStudentDto);
      await this.studentRepository.save(student);

      return {
        message: "Student successfully saved",
        student
      };
    } catch(error){
      this.handlerErrors(error);
    }
  }

  async findAll() {
    try {
      return await this.studentRepository.find({
        relations: ['user', 'enrollments']
      });
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async findOneById(id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid ID');

    try {
      const student = await this.studentRepository.findOne({
        where: { id },
        relations: ['user', 'enrollments']
      });

      if (!student) throw new NotFoundException(`Student with id ${id} not found`);

      return student;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async update(id: string, dto: UpdateStudentDto) {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['user']
    });

    if (!student)
      throw new NotFoundException(`Student with id ${id} not found`);

    if (dto.entryYear !== undefined)
      student.entryYear = dto.entryYear;

    if (dto.user) {
      const { full_name, email, password, role } = dto.user;

      if (full_name !== undefined) student.user.full_name = full_name;
      if (email !== undefined) student.user.email = email;
      if (role !== undefined) student.user.role = role;

      if (password !== undefined && password.trim() !== "") {
        student.user.password = await bcrypt.hash(password, 12);
      }
    }

    try {
      await this.studentRepository.manager.save(student.user);
      await this.studentRepository.save(student);

      return {
        message: `Student updated successfully`,
        student
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async remove(id: string) {
    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student)
      throw new NotFoundException(`Student with id ${id} not found`);

    try {
      await this.studentRepository.remove(student);
      return `Student with id ${id} has been deleted`;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  handlerErrors(error: any) {
    this.logger.error(error.message);
    throw new BadRequestException(error.message);
  }
}
