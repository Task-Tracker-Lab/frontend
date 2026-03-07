import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from '@prisma/client';
import { handlePrismaError } from '../../shared/helpers/handle-prisma-error.helper';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    });
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async findByEmailOrNull(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this.prisma.user.create({
        data: createUserDto,
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      handlePrismaError(error, { UNIQUE_CONSTRAINT: 'User with this email already exists' });
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      };
    } catch (error) {
      handlePrismaError(error, { NOT_FOUND: 'User not found' });
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error, { NOT_FOUND: 'User not found' });
    }
  }
}
