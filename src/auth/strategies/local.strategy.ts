import { UserService } from './../../users/users.service';
import { Config } from 'src/shared/config';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private userService: UserService) {
        super(Config.getPassportLocalStrategyConfig());
    }

    // return user
    async validate(email: string, password: string) {
        return this.userService.validateUser(email, password);
    }
}