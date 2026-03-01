import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from './utils/hashPassword/hashPassword';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.userService.findByEmail(email);

    if (!user) return null;

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  async registration(createUserDto: CreateUserDto) {
    const existing = await this.userService.findByEmail(createUserDto.email);
    if (existing) {
      throw new ConflictException('Email in use');
    }

    const hashedPassword = await hashPassword(createUserDto.password);

    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.login(user);
  }

  async login(user: UserDto): Promise<{ access_token: string }> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async me(user: JwtPayload): Promise<UserDto> {
    const { sub: id } = user;
    return await this.userService.findById(id);
  }
}
