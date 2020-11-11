import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWTPayload } from '../auth.dto';
import { Config } from 'src/shared/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super(Config.getPassportJWTStrategyConfig());
    }
    // userid vs payload
    async validate({ userId, email }: JWTPayload) {
        return { userId: userId, email: email };
    }
}