import { Config } from 'src/shared/config';
import { BoardEntity } from 'src/boards/boards.entity';
import { PermissionLevel } from './boards.entity';
import { UserDTO } from 'src/users/users.dto';

export abstract class BoardDTO {
    id: string;
    name: string;
    url: string;
    permissionLevel: PermissionLevel;

    static EntityToDTO(board: BoardEntity) {
        const { id, name, permissionLevel } = board;
        const { hostUrl } = Config.getCurrentHost();
        const url = `${hostUrl}/boards/${id}`;
        const boardDTO: BoardDTO = { id, name, permissionLevel, url };
        return boardDTO;
    }
}

export class CreateBoardDTO {
    name: string;
    idBoardTemplate?: string;
}

export class UpdateBoardDTO {
    name?: string;
    permissionLevel?: PermissionLevel;
}