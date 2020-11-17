import { ListEntity } from 'src/lists/lists.entity';
import { CardDTO } from 'src/cards/cards.dto';
import { ListDTO } from 'src/lists/lists.dto';
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
        return this.convertToDTO(board);
    }

    protected static convertToDTO(board: BoardEntity) {
        const { id, name, permissionLevel } = board;

        const { hostUrl } = Config.getCurrentHost();
        const url = `${hostUrl}/boards/${id}`;

        const boardDTO: BoardDTO = { id, name, permissionLevel, url };
        return boardDTO;
    }
}
export abstract class BoardDetailDTO extends BoardDTO {

    lists: ListDTO[]
    cards: CardDTO[]
    members: {
        id: string,
        idMember: string,
        memberType: 'owner' | 'member',
    }[]

    protected static convertToDTO(board: BoardEntity) {
        const boardDTO: BoardDTO = BoardDTO.EntityToDTO(board);
        // const { id, name, permissionLevel } = board;

        // const { hostUrl } = Config.getCurrentHost();
        // const url = `${hostUrl}/boards/${id}`;
        let lists, cards;
        if (board.lists) {
            const filteredLists = board.lists.filter(list => list.delete_at == null);
            lists = filteredLists.map(list => ListDTO.EntityToDTO({ ...list, board: { id: boardDTO.id } as BoardEntity }));


            cards = filteredLists.reduce((memo, cur) => {
                if (cur != null && cur.cards != null) {
                    const filteredCards = cur.cards.filter(card => card.delete_at == null);
                    return memo.concat(filteredCards.map(card => CardDTO.EntityToDTO({ ...card, list: { id: cur.id, board: { id: boardDTO.id } } as ListEntity })));
                }
                return memo;
            }, []);
        }
        const members = [];

        const boardDetailDTO: BoardDetailDTO = { ...boardDTO, lists, cards, members };
        // const boardDetailDTO: BoardDetailDTO = { id, name, permissionLevel, url, lists, cards, members };
        return boardDetailDTO;
    }
}

export class BoardData {
    name: string;
}

export class CreateBoardDTO extends BoardData {
    idBoardTemplate?: string;
}

export class UpdateBoardDTO {
    /** change name */
    name?: string;

    /** share board */
    permissionLevel?: PermissionLevel;
}