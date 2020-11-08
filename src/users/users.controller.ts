import { DACAuthenticationGuard } from './../auth/guards/dac.guard';
import { JWTAuthenticationGuard } from '../auth/guards/jwt.guard';
import { Body, Controller, forwardRef, Inject, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UpdateUserDto, UserDto } from "./users.dto";
import { UserService } from "./users.service";
import { RequestWithToken } from 'src/auth/auth.dto';


@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post()
    createUser(@Body() user: UserDto) {
        return this.userService.createUser(user);
    }

    @Patch(':id')
    @UseGuards(JWTAuthenticationGuard, DACAuthenticationGuard)
    updateUser(
        @Param('id') id: string,
        @Body() userData: UpdateUserDto,
        @Req() request: RequestWithToken
    ) {
        const { name } = userData;
        return this.userService.updateUser(id, { name });
    }
}