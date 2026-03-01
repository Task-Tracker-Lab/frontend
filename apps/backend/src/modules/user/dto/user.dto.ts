import type { UserRole } from '@prisma/client'

export interface UserDto {
    id: number
    name: string
    email: string
    role: UserRole
}
