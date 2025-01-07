import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExpressRequest } from 'src/user/types/expressRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    console.log("AuthGuard", request.user);
    if (!request.user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}
