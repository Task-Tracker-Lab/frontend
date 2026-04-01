import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '../../shared/types';
import { PrivateUserDto } from '../user/dto/user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { isProd } from '../../env';
import { type FastifyReply } from 'fastify';
import { LoginRequestDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginUserDto: LoginRequestDto,
    @Res({ passthrough: true }) res: FastifyReply
  ): Promise<ApiResponse<PrivateUserDto>> {
    const { accessToken, user } = await this.authService.login(loginUserDto);

    res.setCookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      path: '/',
    });

    return { data: user };
  }

  @Post('logout')
  @HttpCode(204)
  async logout(@Res({ passthrough: true }) res: FastifyReply) {
    res.clearCookie('access_token', { path: '/' });
  }

  @Post('registration')
  async registration(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.authService.registration(createUserDto);
  }
}
