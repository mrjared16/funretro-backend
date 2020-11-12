import { forwardRef } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { OAuthPayload, RequestWithToken } from 'src/auth/auth.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/users.entity';
import { JWTPayload } from './auth.interface';

import { create } from 'domain';
import { UserDTO, CreateUserDTO } from 'src/users/users.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    getToken({ email, id }: UserDTO) {
        const payload: JWTPayload = {
            email,
            userId: id
        };

        return {
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token: this.jwtService.sign(payload),
        };
    }

    async loginWithGoogleOAuth(payload: OAuthPayload) {
        const { name, email } = payload;
        const userWithPayloadEmail = await this.userService.findUser({ email });
        if (userWithPayloadEmail) {
            return userWithPayloadEmail;
        }
        const newUser = await this.userService.createUser({ email, name, password: null });
        return newUser;
    }

    login(user: UserDTO) {
        if (user == null) {
            return;
        }
        return this.getToken(user);
    }

}