
interface UpdateUserDto {
    name: string;
}

interface UserModel {
    id: string;
    username: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

interface UserDto {
    username: string;
    name: string;
    password: string;
}
export {
    UpdateUserDto,
    UserDto,
    UserModel
}