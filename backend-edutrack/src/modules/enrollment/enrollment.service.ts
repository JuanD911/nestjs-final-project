import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Repository } from 'typeorm';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class EnrollmentService {
  private readonly logger = new Logger('EnrollmentService');

  constructor(
    @InjectRepository(EnrollmentEntity)
    private readonly enrollmentRepository: Repository<EnrollmentEntity>,
  ) {}

  async createEnrollment(createEnrollmentDto: CreateEnrollmentDto) {
    try {
      const enrollment = this.enrollmentRepository.create(createEnrollmentDto);
      await this.enrollmentRepository.save(enrollment);

      this.logger.log(`Enrollment created: ${enrollment}`)

      return {
        message: 'Enrollment was successfully saved',
        enrollment,
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async findAll() {
    try {
      return await this.enrollmentRepository.find({
        relations: ['student', 'course', 'student.user']
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
      const enrollment = await this.enrollmentRepository.findOne({
        where: { id },
        relations: ['student', 'course']
      });

      if (!enrollment) {
        throw new NotFoundException(`Enrollment with id ${id} not found`);
      }

      return enrollment;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async update(id: string, updateEnrollmentDto: UpdateEnrollmentDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('The provided ID is not valid.');
    }

    try {
      const enrollment = await this.enrollmentRepository.preload({
        id,
        ...updateEnrollmentDto,
      });

      if (!enrollment) {
        throw new NotFoundException(`Enrollment with id ${id} not found`);
      }

      await this.enrollmentRepository.save(enrollment);
      this.logger.log(`Enrollment updated: ${enrollment}`)

      return {
        message: `The Enrollment with id ${id} was successfully updated`,
        enrollment,
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
      const enrollment = await this.enrollmentRepository.findOne({ where: { id } });

      if (!enrollment) {
        throw new NotFoundException(`Enrollment with id ${id} not found`);
      }

      await this.enrollmentRepository.remove(enrollment);
      this.logger.log(`Enrollment deleted: ${enrollment}`)
      return `Enrollment with id ${id} has been deleted`;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  handlerErrors(error: any) {
    this.logger.error(error);

    if (error.code === '23505') {
      throw new BadRequestException('A record with these values already exists (duplicate key).');
    }

    throw new BadRequestException(error.message || 'Unexpected error occurred.');
  }
}

