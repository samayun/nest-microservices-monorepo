import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AUTH_SERVICE } from '..';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap } from 'rxjs';
// import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(context);

    console.log({ authentication });

    return this.authClient
      .send('validate_user', {
        topic: 'token',
        token: authentication,
      })
      .pipe(
        tap((res) => {
          this.addUser(res, context);
        }),
        catchError(() => {
          throw new UnauthorizedException();
        }),
      );
  }

  private getAuthentication(context: ExecutionContext) {
    let authentication: string;
    if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData().accessToken;
    } else if (context.getType() === 'http') {
      authentication = context.switchToHttp().getRequest().cookies?.accessToken;
    }
    // else if (context.getType() === 'ws') {
    //   authentication = context.switchToWs().getData().cookies?.accessToken;
    // }
    // else {
    //   const ctx = GqlExecutionContext.create(context);
    //   const { req } = ctx.getContext();
    //   authentication = req.cookies.accessToken;
    // }
    if (!authentication) {
      throw new UnauthorizedException(
        'No value was provided for Authentication',
      );
    }
    return authentication;
  }

  private addUser(user: any, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
    // else if (context.getType() === 'ws') {
    //   context.switchToWs().getData().user = user;
    // }
  }
}
