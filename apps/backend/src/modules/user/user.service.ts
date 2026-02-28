import { Injectable, NotFoundException } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from '../../prisma/prisma.service'
import { UserDto } from './dto/user.dto'
import { Prisma } from '@prisma/client'
import { CreateUserDto } from '../auth/dto/create-user.dto'
import { User } from '@prisma/client'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

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

    async findById(id: number): Promise<UserDto> {
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

    async findByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { email }
        })
    }

    async create(createUserDto: CreateUserDto): Promise<UserDto> {
        const user = await this.prisma.user.create({
            data: createUserDto
        })

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
