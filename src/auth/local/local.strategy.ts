import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserDto } from 'src/users/users.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'username'
        });
    }

    // return user
    async validate(username: string, password: string) {
        // console.log({ username, password });
        return this.authService.login(username, password);
    }
}