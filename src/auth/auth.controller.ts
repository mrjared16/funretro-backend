import { UserService } from './../users/users.service';
import { GoogleOAuthAuthenticaionGuard } from './guards/google.guard';
import { LocalAuthenticationGuard } from './guards/local.guard';
import { Body, Get, HttpCode, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser, RequestWithOAuthPayload } from './auth.dto';
import { CreateUserDto } from 'src/users/users.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @Post('register')
    async register(@Body() registrationData: CreateUserDto) {
        return await this.userService.createUser(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async logIn(@Req() request: RequestWithUser) {
        const { user } = request;
        return this.authService.login(user);
    }


    @Get('oauth/google')
    @UseGuards(GoogleOAuthAuthenticaionGuard)
    async googleOAuth() {
    }

    @Get('oauth/google/callback')
    @UseGuards(GoogleOAuthAuthenticaionGuard)
    async googleOAuthCallback(@Req() request: RequestWithUser) {
        const { user } = request;
        return this.authService.login(user);
    }
}