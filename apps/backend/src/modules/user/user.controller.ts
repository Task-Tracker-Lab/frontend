import { Controller, Get, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from '../../shared/types';
import type { CurrentUserType } from '../auth/types/jwt-payload.type';
import { ParseCuidPipe } from '../../shared/pipes';
import { JwtAuthGuard } from '../../shared/guards';
import { CurrentUser } from '../../shared/decorators';
import { PrivateUserDto, PublicUserDto } from './dto/user.dto';
import type { UpdateAuthUserPasswordDto } from './dto/update-auth-user-password.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@CurrentUser() user: CurrentUserType): Promise<ApiResponse<PrivateUserDto>> {
    const userData = await this.userService.me(user.id);

    return { data: userData };
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Patch('me/password')
  async updatePassword(
    @Body() updatePasswordDto: UpdateAuthUserPasswordDto,
    @CurrentUser() user: CurrentUserType
  ): Promise<void> {
    await this.userService.updatePassword(user, updatePasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id', ParseCuidPipe) id: string): Promise<ApiResponse<PublicUserDto>> {
    const user = await this.userService.findPublicById(id);
    return { data: user };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/me')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: CurrentUserType
  ): Promise<ApiResponse<PrivateUserDto>> {
    const updatedUser = await this.userService.update(user.id, updateUserDto);
    return { data: updatedUser };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/me')
  @HttpCode(204)
  async remove(@CurrentUser() user: CurrentUserType) {
    await this.userService.remove(user.id);
  }
}
