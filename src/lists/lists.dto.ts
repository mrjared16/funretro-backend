import { ListEntity } from 'src/lists/lists.entity';

export abstract class ListDTO {
    id: string;
    idBoard: string;
    color: string;
    name: string;
    pos: number;

    static EntityToDTO(list: ListEntity) {
        if (list == null)
            return null;
        const { id, board, color, name, pos } = list || {};
        const [idBoard] = [board.id];
        const listDTO: ListDTO = { id, idBoard, name, color, pos }
        return listDTO;
    }
}


export class ListData {
    name: string;
    pos: number;
    color?: string;
}

export class UpdateListDTO implements Partial<ListData> {
    // pos?: number;
    // name?: string;
    // color?: string;
}

export class CreateListDTO extends ListData {
    idBoard: string;
}