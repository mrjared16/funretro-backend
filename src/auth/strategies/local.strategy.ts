import { Config } from 'src/shared/config';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super(Config.getPassportLocalStrategyConfig());
    }

    // return user
    async validate(username: string, password: string) {
        return this.authService.login(username, password);
    }
}