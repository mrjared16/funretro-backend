import { ListData } from 'src/lists/lists.dto';
import { CardEntity } from 'src/cards/cards.entity';

export abstract class CardDTO {
    id: string;
    idBoard: string;
    idList: string;
    name: string;
    pos: number;

    static EntityToDTO(card: CardEntity) {
        if (card == null)
            return null;
        const { id, list, name, pos, listId } = card;
        const [idBoard, idList] = [list.board?.id, listId];
        const cardDTO: CardDTO = { id, idBoard, idList, name, pos }
        return cardDTO;
    }
}
export class CardData {
    name: string;
    pos: number;
}
export class UpdateCardDTO extends CardData implements Partial<CardData> {
    idList?: string;
}
export class CreateCardDTO extends ListData {
    idBoard: string;
    idList: string;
}