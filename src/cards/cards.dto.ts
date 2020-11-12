import { CardEntity } from 'src/cards/cards.entity';

export abstract class CardDTO {
    id: string;
    idBoard: string;
    idList: string;
    name: string;
    pos: number;

    static EntityToDTO(card: CardEntity) {
        const { id, list, name, pos } = card;
        const [idBoard, idList] = [list.board.id, list.id];
        const cardDTO: CardDTO = { id, idBoard, idList, name, pos }
        return cardDTO;
    }
}

export class UpdateCardDTO {
    pos?: number;
    idList?: string;
    name?: string;
}

export class CreateCardDTO {
    idBoard: string;
    idList: string;
    name: string;
    pos: number;
}