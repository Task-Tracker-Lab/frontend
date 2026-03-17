import { Prisma } from '@prisma/client';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';

type PrismaErrorMessages = {
  NOT_FOUND?: string;
  UNIQUE_CONSTRAINT?: string;
  FOREIGN_KEY?: string;
  VALUE_TOO_LONG?: string;
};

export function handlePrismaError(error: unknown, messages: PrismaErrorMessages): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2025':
        if (messages.NOT_FOUND) {
          throw new NotFoundException(messages.NOT_FOUND ?? 'Not found');
        }
        break;

      case 'P2002':
        if (messages.UNIQUE_CONSTRAINT) {
          throw new ConflictException(messages.UNIQUE_CONSTRAINT ?? 'Unique constraint failed');
        }
        break;

      case 'P2003':
        if (messages.FOREIGN_KEY) {
          throw new ConflictException(messages.FOREIGN_KEY ?? 'Foreign key constraint failed');
        }
        break;

      case 'P2000':
        if (messages.VALUE_TOO_LONG) {
          throw new BadRequestException(messages.VALUE_TOO_LONG ?? 'Value too long');
        }
        break;
    }
  }

  throw error;
}
