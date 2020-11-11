import { UserDto } from 'src/users/users.dto';

export interface UpdateUserResponse  {
    response: {
        user: UserDto
    }
}