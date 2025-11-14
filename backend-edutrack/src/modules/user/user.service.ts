import {BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/users.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createuser(createuserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createuserDto);
      await this.userRepository.save(user);

      return {
        message: 'User was successfully saved',
        user,
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async findOneById(id: string) {
    if (!isUUID(id))
      throw new BadRequestException('The search term entered is not a valid ID');

    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user)
        throw new NotFoundException(`User with id ${id} not found`);

      return user;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async update(id: string, updateuserDto: UpdateUser) {
    const user = await this.userRepository.preload({
      id,
      ...updateuserDto,
    });

    if (!user)
      throw new NotFoundException(`User with id ${id} not found`);

    try {
      await this.userRepository.save(user);

      return {
        message: `The user with id ${id} was successfully updated`,
        user,
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user)
      throw new NotFoundException(`User with id ${id} not found`);

    try {
      await this.userRepository.remove(user);
      return `User with id ${id} has been deleted`;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  handlerErrors(error: any) {
    this.logger.error(error.message);
    throw new BadRequestException(error.message);
  }
}
