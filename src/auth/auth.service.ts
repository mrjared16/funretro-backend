import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { PayloadDto, RegisterDto } from './auth.dto';
import * as bcrypt from 'bcryptjs';
import { create } from 'domain';
import { UserModel } from 'src/users/users.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    getToken({ username, id }: UserModel) {
        const payload: PayloadDto = {
            username,
            sub: id
        };

        return {
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token: this.jwtService.sign(payload),
        };
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        // return true;
        return bcrypt.compare(password, hashedPassword);
    }

    async hash(str: string): Promise<string> {
        return await bcrypt.hash(str, 10);
    }

    async login(username: string, pass: string): Promise<UserModel> {
        try {
            const user = await this.userService.findUserByUsername(username);
            const isPasswordMatching = await this.comparePassword(pass, user.password);
            if (!isPasswordMatching) {
                throw new HttpException('Wrong username or password ', HttpStatus.BAD_REQUEST);
            }

            const { password, ...userWithoutPassword } = user;

            return userWithoutPassword;
        } catch (error) {
            throw new HttpException('Wrong username or password ', HttpStatus.BAD_REQUEST);
        }
    }

    async register(registrationData: RegisterDto) {
        const hashedPassword = await this.hash(registrationData.password); 
        const user = await this.userService.findUserByUsername(registrationData.username);
        // console.log({ user });
        if (user != null) {
            throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
        }

        const createdUser = await this.userService.createUser({
            ...registrationData,
            password: hashedPassword
        });

        const { password, ...newUser } = createdUser;

        return newUser;
    }


}