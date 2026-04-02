import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrivateUserDto } from '../user/dto/user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { isProd } from '../../env';
import { type FastifyReply } from 'fastify';
import { LoginRequestDto } from './dto/login.dto';
import { ApiOkResponseDto } from '../../shared/decorators';
import { ApiResponseHttpCodes } from '../../shared/decorators/api-response-http-codes.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOkResponseDto(PrivateUserDto)
  @ApiResponseHttpCodes(401, 400)
  async login(
    @Body() loginUserDto: LoginRequestDto,
    @Res({ passthrough: true }) res: FastifyReply
  ): Promise<PrivateUserDto> {
    const { accessToken, user } = await this.authService.login(loginUserDto);

    res.setCookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      path: '/',
    });

    return user;
  }

  @Post('logout')
  @HttpCode(204)
  @ApiResponseHttpCodes()
  async logout(@Res({ passthrough: true }) res: FastifyReply): Promise<void> {
    res.clearCookie('access_token', { path: '/' });
  }

  @Post('registration')
  @ApiResponseHttpCodes(409, 400)
  async registration(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.authService.registration(createUserDto);
  }
}
