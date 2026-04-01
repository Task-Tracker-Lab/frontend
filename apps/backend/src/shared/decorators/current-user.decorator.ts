import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { type CurrentUserType } from '../../modules/auth/types/jwt-payload.type';

export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUserType | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest & { user?: CurrentUserType }>();
    const user = request.user;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  }
);
