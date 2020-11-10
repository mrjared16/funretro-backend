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

interface RequestWithToken extends Request {
    user: JWTPayload;
    params;
    body;
}

interface RequestWithOAuthPayload extends Request {
    user: OAuthPayload;
}

interface OAuthPayload {
    name: string;
    email: string;
}
interface JWTPayload {
    userId: string;
    username: string
}

export {
    RegisterDto,
    RequestWithUser,
    JWTPayload,
    RequestWithToken,
    OAuthPayload,
    RequestWithOAuthPayload
};