import { UserDTO } from 'src/users/users.dto';

export interface RequestWithUser extends Request {
    user: UserDTO;
}

export interface RequestWithToken extends Request {
    user: JWTPayload;
    params;
    body;
}

export interface RequestWithOAuthPayload extends Request {
    user: OAuthPayload;
}

export interface OAuthPayload {
    name: string;
    email: string;
}
export interface JWTPayload {
    userId: string;
    email: string;
}

export class LoginResponse {
    response: {
        access_token: string;
    }
}
