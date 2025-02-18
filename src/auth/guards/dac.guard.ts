import { RequestWithToken } from 'src/auth/auth.interface';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class DACAuthenticationGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: RequestWithToken = context.switchToHttp().getRequest();
        const { user, params, body } = request;
        const { userId } = user;
        const { id = '' } = { ...params, ...body };
        return userId === id;
    }
}