
export abstract class ListDTO {
    id: string;
    idBoard: string;
    name: string;
    pos: number;
}


export class UpdateListDTO {
    pos?: number;
    name?: string;
}

export class CreateListDTO {
    idBoard: string;
    name: string;
    pos: number;
}