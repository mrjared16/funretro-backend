import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
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
    updateUser(
        @Param('id') id: string,
        @Body() user: UpdateUserDto
    ) {
        const { ...userData } = user;
        console.log({ user, id });
        return this.userService.updateUser(id, userData);
    }
}