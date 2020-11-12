import { UserDTO } from 'src/users/users.dto';

export interface UpdateUserResponse  {
    response: {
        user: UserDTO
    }
}