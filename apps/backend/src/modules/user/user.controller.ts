import { Controller, Get, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import type { CurrentUserType } from '../auth/types/jwt-payload.type';
import { ParseCuidPipe } from '../../shared/pipes';
import { JwtAuthGuard } from '../../shared/guards';
import { ApiOkResponseDto, ApiOkResponsePaginatedDto, CurrentUser } from '../../shared/decorators';
import { PrivateUserDto, PublicUserDto } from './dto/user.dto';
import { UpdateAuthUserPasswordDto } from './dto/update-auth-user-password.dto';
import { ApiResponseHttpCodes } from '../../shared/decorators/api-response-http-codes.decorator';
import { PaginatedListExampleType } from './dto/PaginatedListExampleType.dto';
import { PaginatedResult } from '../../shared/types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOkResponseDto(PrivateUserDto)
  @ApiResponseHttpCodes(401)
  async me(@CurrentUser() user: CurrentUserType): Promise<PrivateUserDto> {
    return this.userService.me(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Patch('me/password')
  @ApiResponseHttpCodes(404, 400, 401)
  async updatePassword(
    @Body() updatePasswordDto: UpdateAuthUserPasswordDto,
    @CurrentUser() user: CurrentUserType
  ): Promise<void> {
    await this.userService.updatePassword(user, updatePasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponseDto(PublicUserDto)
  @ApiResponseHttpCodes(404, 401, 400)
  async findById(@Param('id', ParseCuidPipe) id: string): Promise<PublicUserDto> {
    return this.userService.findPublicById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/me')
  @ApiOkResponseDto(PrivateUserDto)
  @ApiResponseHttpCodes(401, 404, 400)
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: CurrentUserType
  ): Promise<PrivateUserDto> {
    return this.userService.update(user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/me')
  @HttpCode(204)
  @ApiResponseHttpCodes(401, 404)
  async remove(@CurrentUser() user: CurrentUserType): Promise<void> {
    await this.userService.remove(user.id);
  }

  // Example for paginated list response
  @Get('/PaginatedListExample')
  @ApiOkResponsePaginatedDto(PaginatedListExampleType)
  async PaginatedListExample(): Promise<PaginatedResult<PaginatedListExampleType>> {
    const lst = [
      { id: '1', name: 'test1' },
      { id: '2', name: 'test2' },
    ];

    return {
      items: lst,
      total: 2,
      page: 1,
      limit: 10,
    };
  }
}
