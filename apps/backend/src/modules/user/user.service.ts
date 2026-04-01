import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DomainError } from '../../shared/errors';
import { privateUserSelect, publicUserSelect } from './selectors/user.selectors';
import { PrivateUserDto, PublicUserDto } from './dto/user.dto';
import bcrypt from 'bcrypt';
import { UpdateAuthUserPasswordDto } from './dto/update-auth-user-password.dto';
import { CurrentUserType } from '../auth/types/jwt-payload.type';
import { hashPassword } from '../auth/utils/hashPassword/hashPassword';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async me(id: string): Promise<PrivateUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: privateUserSelect,
    });
    if (!user) {
      throw DomainError.Unauthorized();
    }

    return user;
  }

  async updatePassword(
    currentUser: CurrentUserType,
    updatePasswordDto: UpdateAuthUserPasswordDto
  ): Promise<void> {
    const user = await this.findByEmailWithPasswordOrNull(currentUser.email);
    if (!user) {
      throw DomainError.NotFound('User not found');
    }

    const isValidPassword = await bcrypt.compare(updatePasswordDto.oldPassword, user.password);
    if (!isValidPassword) {
      throw DomainError.BadRequest('Invalid password');
    }

    const hashedNewPassword = await hashPassword(updatePasswordDto.newPassword);

    await this.prisma.user.update({
      where: { id: currentUser.id },
      data: {
        password: hashedNewPassword,
      },
    });
  }

  async findPublicById(id: string): Promise<PublicUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: publicUserSelect,
    });
    if (!user) {
      throw DomainError.NotFound('User not found');
    }

    return user;
  }

  async findByEmailWithPasswordOrNull(
    email: string
  ): Promise<(PrivateUserDto & { password: string }) | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        ...privateUserSelect,
        password: true,
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<PrivateUserDto> {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: privateUserSelect,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
