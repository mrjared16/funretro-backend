import { forwardRef } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { OAuthPayload, RequestWithToken } from 'src/auth/auth.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/users.entity';
import { JWTPayload } from './auth.dto';

import { create } from 'domain';
import { UserDto, CreateUserDto } from 'src/users/users.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    getToken({ email, id }: UserDto) {
        const payload: JWTPayload = {
            email,
            userId: id
        };

        return {
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token: this.jwtService.sign(payload),
        };
    }

    async loginWithGoogleOAuth(payload: OAuthPayload): Promise<UserDto> {
        return null;
    }

    async login(user: UserDto) {
        if (user == null) {
            return;
        }
        return this.getToken(user);
    }

}