import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { hashPassword } from './utils/hashPassword/hashPassword';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './types/jwt-payload.type';
import { DomainError } from '../../shared/errors';
import { LoginRequestDto } from './dto/login.dto';
import { PrivateUserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async registration(createUserDto: CreateUserDto): Promise<void> {
    const hashedPassword = await hashPassword(createUserDto.password);
    await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async login(
    loginUserDto: LoginRequestDto
  ): Promise<{ user: PrivateUserDto; accessToken: string }> {
    const user = await this.userService.findByEmailWithPasswordOrNull(loginUserDto.email);
    if (!user) {
      throw DomainError.Unauthorized('Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isValidPassword) {
      throw DomainError.Unauthorized('Invalid email or password');
    }

    const { password: _, ...userDto } = user;

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: userDto,
    };
  }
}
