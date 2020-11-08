import { JWTAuthenticationGuard } from '../auth/jwt/jwt.guard';
import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UpdateUserDto, UserDto } from "./users.dto";
import { UserService } from "./users.service";


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Post()
    createUser(@Body() user: UserDto) {
        return this.userService.createUser(user);
    }

    @Patch(':id')
    @UseGuards(JWTAuthenticationGuard)
    updateUser(
        @Param('id') id: string,
        @Body() user: UpdateUserDto
    ) {
        const { ...userData } = user;
        // console.log({ user, id });
        return this.userService.updateUser(id, userData);
    }
}