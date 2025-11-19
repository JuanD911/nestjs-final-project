import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class CourseService {
  private readonly logger = new Logger('CourseService');

  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto) {
    try {
      const course = this.courseRepository.create(createCourseDto);
      await this.courseRepository.save(course);

      return {
        message: 'Course was successfully saved',
        course,
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async findAll() {
    try {
      return await this.courseRepository.find({
        relations: ['professor', 'enrollments']
      });
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async findOneById(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('The provided ID is not valid.');
    }

    try {
      const course = await this.courseRepository.findOne({
        where: { id },
        relations: ['professor', 'professor.user', 'enrollments', 'enrollments.student']
      });

      if (!course) {
        throw new NotFoundException(`Course with id ${id} not found`);
      }

      return course;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('The provided ID is not valid.');
    }

    try {
      const course = await this.courseRepository.preload({
        id,
        ...updateCourseDto,
      });

      if (!course) {
        throw new NotFoundException(`Course with id ${id} not found`);
      }

      await this.courseRepository.save(course);

      return {
        message: `The Course with id ${id} was successfully updated`,
        course,
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('The provided ID is not valid.');
    }

    try {
      const course = await this.courseRepository.findOne({ where: { id } });

      if (!course) {
        throw new NotFoundException(`Course with id ${id} not found`);
      }

      await this.courseRepository.remove(course);
      return `Course with id ${id} has been deleted`;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  handlerErrors(error: any) {
    this.logger.error(error);

    if (error.code === '23505') {
      throw new BadRequestException('A record with these values already exists (duplicate key).');
    }

    throw new BadRequestException(
      error.message || 'Unexpected error occurred.'
    );
  }
}