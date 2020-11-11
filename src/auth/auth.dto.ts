import { UserDto } from "src/users/users.dto";

interface RequestWithUser extends Request {
    user: UserDto;
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
    email: string;
}

export {
    RequestWithUser,
    RequestWithToken,
    RequestWithOAuthPayload,
    JWTPayload,
    OAuthPayload,
};