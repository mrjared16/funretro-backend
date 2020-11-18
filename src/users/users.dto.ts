import { UserEntity } from './users.entity';
export class UpdateUserDTO {
    name: string;
}

export class CreateUserDTO {
    // @IsNotEmpty()
    email: string;
    name: string;
    password: string;
}

export class UserDTO {
    id: string;
    email: string;
    name: string;
    static EntityToDTO(userEntity: UserEntity): UserDTO {
        if (userEntity == null)
            return null;
        const { id, email, name } = userEntity || {};
        let userDTO: UserDTO = { id, email, name };
        return userDTO;
    }
}
