import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from '../../../env';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../types/jwt-payload.type';
import { UserService } from '../../user/user.service';
import { DomainError } from '../../../shared/errors';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.access_token]),
      secretOrKey: env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const user = await this.userService.findByEmailOrNull(payload.email);
    if (!user) {
      throw DomainError.Unauthorized();
    }
    return payload;
  }
}
