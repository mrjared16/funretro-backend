import { UserDTO } from 'src/users/users.dto';

export abstract class BoardDTO {
    id: string;
    name: string;
    url: string;
    // lists: ListEntity[];
}

export class CreateBoardDTO {
    name: string;
    idBoardTemplate?: string;
}

export class UpdateBoardDTO {
    name?: string;
    permissionLevel?: 'public' | 'member' | 'private';
}