import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from '../../shared/types/api-response.type';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRole } from '@prisma/client';
import { JwtPayload } from '../auth/types/jwt-payload.type';
import { ParseCuidPipe } from '../../shared/pipes/parse-cuid.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: Request & { user: JwtPayload }): Promise<ApiResponse<UserDto[]>> {
    if (req.user.role !== UserRole.ADMIN && req.user.role !== UserRole.MODERATOR) {
      throw new ForbiddenException();
    }
    const users = await this.userService.findAll();

    return { data: users };
  }

  @Get(':id')
  async findById(@Param('id', ParseCuidPipe) id: string): Promise<ApiResponse<UserDto>> {
    const user = await this.userService.findById(id);

    return { data: user };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseCuidPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request & { user: JwtPayload }
  ): Promise<ApiResponse<UserDto>> {
    // TODO: password update?

    if (req.user.role !== UserRole.ADMIN && req.user.sub !== id) {
      throw new ForbiddenException();
    }

    const user = await this.userService.update(id, updateUserDto);

    return { data: user };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseCuidPipe) id: string, @Req() req: Request & { user: JwtPayload }) {
    if (req.user.role !== UserRole.ADMIN && req.user.sub !== id) {
      throw new ForbiddenException();
    }
    return this.userService.remove(id);
  }
}
