import { GoogleOAuthAuthenticaionGuard } from './guards/google.guard';
import { LocalAuthenticationGuard } from './guards/local.guard';
import { Body, Get, HttpCode, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto, RequestWithUser, RequestWithOAuthPayload } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async logIn(@Req() request: RequestWithUser) {
        // console.log({ request });
        const user = request.user;
        if (user == null) {
            return;
        }
        const accessToken = this.authService.getToken(user);
        return accessToken;
    }


    @Get('oauth/google')
    @UseGuards(GoogleOAuthAuthenticaionGuard)
    async googleOAuth() {
        return 'hello';
    }

    @Get('oauth/google/callback')
    @UseGuards(GoogleOAuthAuthenticaionGuard)
    async googleOAuthCallback(@Req() request: RequestWithOAuthPayload) {
        const { name, email } = request.user;
        return { name, email };
    }
}