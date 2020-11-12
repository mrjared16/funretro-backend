
export abstract class CardDTO {
    id: string;
    idBoard: string;
    idList: string;
    name: string;
    pos: number;
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