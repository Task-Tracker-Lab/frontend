import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { CurrentUserType } from '../../modules/auth/types/jwt-payload.type';
import { DomainError } from '../errors';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<FastifyRequest & { user?: CurrentUserType }>();
    const user = request.user;

    if (!user) {
      throw DomainError.Unauthorized();
    }

    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      throw DomainError.Forbidden();
    }

    return true;
  }
}
