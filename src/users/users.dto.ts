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
    created_at: Date;
    updated_at: Date;
    static toEntity(userDto: UserDto): UserEntity {
        return null;
    }
    static toDTO(userEntity: UserEntity): UserDto {
        return null;
    }
}



export {
    UpdateUserDto,
    UserDto,
    CreateUserDto
}