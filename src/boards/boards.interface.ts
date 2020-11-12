import { CardDTO } from "src/cards/cards.dto";
import { ListDTO } from "src/lists/lists.dto";
import { BoardDTO } from "./boards.dto";
import { PermissionLevel } from "./boards.entity";

export interface BoardResponse {
    response: {
        board: BoardDTO;
    }
}

export interface ViewBoardResponse {
    response: {
        board: BoardDTO,
        permissionLevel: PermissionLevel,
        members: {
            id: string,
            idMember: string,
            memberType: 'owner' | 'member',
        }[],
        lists: ListDTO[],
        cards: CardDTO[],
    }
}
