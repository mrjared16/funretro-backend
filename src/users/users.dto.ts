import { UserEntity } from './users.entity';
class UpdateUserDto {
    name: string;
}

class CreateUserDto {
    // @IsNotEmpty()
    email: string;
    name: string;
    password: string;
}

class UserDto {
    id: string;
    email: string;
    name: string;
    static EntityToDTO(userEntity: UserEntity): UserDto {
        if (userEntity == null)
            return null;
        const { id, email, name } = userEntity;
        let userDto: UserDto = { id, email, name };
        return userDto;
    }
}



export {
    UpdateUserDto,
    UserDto,
    CreateUserDto
}