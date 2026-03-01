import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiResponse } from '../../shared/types/api-response.type'
import { UserDto } from '../user/dto/user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { LoginUserDto } from './dto/login-user.dto'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { isProd } from '../../env'
import { JwtPayload } from './types/jwt-payload.type'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Req() req: Request & { user: UserDto },
        @Res({ passthrough: true }) res
    ): Promise<ApiResponse<LoginUserDto>> {
        const { access_token } = await this.authService.login(req.user)

        res.setCookie('access_token', access_token, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
            path: '/'
        })

        return { data: { success: true } }
    }

    @Post('registration')
    async registration(
        @Body() createUserDto: CreateUserDto,
        @Res({ passthrough: true }) res
    ): Promise<ApiResponse<LoginUserDto>> {
        const { access_token } =
            await this.authService.registration(createUserDto)

        res.setCookie('access_token', access_token, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
            path: '/'
        })

        return { data: { success: true } }
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(
        @Req() req: Request & { user: JwtPayload }
    ): Promise<ApiResponse<UserDto>> {
        const user = await this.authService.me(req.user)

        return { data: user }
    }
}
