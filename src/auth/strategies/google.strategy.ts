import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, StrategyOptions, VerifyCallback, Strategy } from 'passport-google-oauth20';
import { OAuthPayload } from '../auth.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        const options: StrategyOptions = {
            clientID: '518549042268-ov161kguqv97610fbcdq43q36eb82per.apps.googleusercontent.com',
            clientSecret: 'kN55D9WtmREvrJNTxAL34O7Q',
            callbackURL: 'http://localhost:3001/auth/oauth/google/callback',
            scope: ['profile', 'email']
        };
        super(options);
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