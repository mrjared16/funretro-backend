import { Config } from 'src/shared/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, StrategyOptions, VerifyCallback, Strategy } from 'passport-google-oauth20';
import { OAuthPayload } from '../auth.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super(Config.getPassportGoogleOAuthStrategyConfig());
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, callback: VerifyCallback) {
        const { displayName, emails } = profile;
        const userPayload: OAuthPayload = {
            name: displayName,
            email: emails[0].value
        }
        callback(null, userPayload);
    }
}