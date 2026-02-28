import {
    ConflictException,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from '../prisma/prisma.service'
import { hashPassword } from './utils/hashPassword/hashPassword'
import { UserDto } from './dto/user.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<UserDto> {
        const existing = await this.prisma.user.findUnique({
            where: { email: createUserDto.email }
        })
        if (existing) {
            throw new ConflictException('User already exist')
        }

        const hashedPassword = await hashPassword(createUserDto.password)
        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword
            }
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }

    async findAll(): Promise<UserDto[]> {
        const users = await this.prisma.user.findMany()

        return users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }

    async findOne(id: number): Promise<UserDto> {
        const user = await this.prisma.user.findUnique({
            where: { id }
        })
        if (!user) {
            throw new NotFoundException('User not found')
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
        try {
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: updateUserDto
            })

            return {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            }
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException('User not found')
            }
            throw error
        }
    }

    async remove(id: number): Promise<void> {
        try {
            await this.prisma.user.delete({
                where: { id }
            })
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException('User not found')
            }
            throw error
        }
    }
}
