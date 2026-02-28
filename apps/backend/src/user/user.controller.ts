import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiResponse } from '../shared/types/api-response.type'
import { UserDto } from './dto/user.dto'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(
        @Body() createUserDto: CreateUserDto
    ): Promise<ApiResponse<UserDto>> {
        const user = await this.userService.create(createUserDto)

        return { data: user }
    }

    @Get()
    async findAll(): Promise<ApiResponse<UserDto[]>> {
        // TODO: request permissions
        const users = await this.userService.findAll()

        return { data: users }
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ApiResponse<UserDto>> {
        const user = await this.userService.findOne(+id)

        return { data: user }
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<ApiResponse<UserDto>> {
        // TODO: password update?
        const user = await this.userService.update(+id, updateUserDto)

        return { data: user }
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.userService.remove(+id)
    }
}
