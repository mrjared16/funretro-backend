import { UserModel } from "src/users/users.dto";


interface RegisterDto {
    username: string,
    name: string,
    password: string,
    // repeatPassword: string,
}

interface RequestWithUser extends Request {
    user: UserModel;
}

interface PayloadDto {
    sub: string;
    username: string
}

export {
    RegisterDto,
    RequestWithUser,
    PayloadDto
};