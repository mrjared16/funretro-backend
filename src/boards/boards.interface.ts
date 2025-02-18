import { CardDTO } from "src/cards/cards.dto";
import { ListDTO } from "src/lists/lists.dto";
import { BoardDTO, BoardDetailDTO } from "./boards.dto";
import { PermissionLevel } from "./boards.entity";

export interface BoardResponse {
    response: {
        board: BoardDTO;
    }
}

export interface ViewAllBoardResponse {
    response: {
        boards: BoardDTO[],
        // idUser: string
    }
}

export interface ViewBoardResponse {
    response: {
        board: BoardDetailDTO
    }
}
