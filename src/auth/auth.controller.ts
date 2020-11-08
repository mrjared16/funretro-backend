import { LocalAuthenticationGuard } from './local/local.guard';
import { Body, HttpCode, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto, RequestWithUser } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

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

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authService.register(registrationData);
    }
}