import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/users.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createuser(createuserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createuserDto.password, 12);

      const user = this.userRepository.create({
        ...createuserDto,
        password: hashedPassword
      });

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

  async update(id: string, updateUserDto: UpdateUser) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user)
      throw new NotFoundException(`User with id ${id} not found`);

    if (updateUserDto.full_name !== undefined)
      user.full_name = updateUserDto.full_name;

    if (updateUserDto.email !== undefined)
      user.email = updateUserDto.email;

    if (updateUserDto.role !== undefined)
      user.role = updateUserDto.role;

    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, 12);
    }

    try {
      await this.userRepository.save(user);
      return {
        message: `User updated successfully`,
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

  async findByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role', 'full_name']
    });
  }

  handlerErrors(error: any) {
    this.logger.error(error);

    if (error.code === '23505') {
      throw new BadRequestException('Email already exists');
    }

    throw new BadRequestException(error.message);
  }
}
