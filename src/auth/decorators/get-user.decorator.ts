import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { JwtUser } from '../strategies/jwt.strategy';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
