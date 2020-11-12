import { BoardEntity } from 'src/boards/boards.entity';
import { ListData, ListDTO } from 'src/lists/lists.dto';
import { CreateListDTO } from './lists.dto';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ListEntity } from './lists.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ListService {
    constructor(
        @InjectRepository(ListEntity)
        private readonly listRepository: Repository<ListEntity>) {

    }

    async createList(data: CreateListDTO): Promise<ListDTO> {
        const { name, color = '', pos, idBoard } = data;
        const board = { id: idBoard };

        const newList = this.listRepository.create({ name, color, pos, board: board as BoardEntity });
        this.listRepository.save(newList);

        return ListDTO.EntityToDTO(newList);
    }

    getListTemplateData(idBoardTemplate: string): ListData[] {
        const KanbanList: { name: string, color: string }[] = [{
            name: 'To do',
            color: '111'
        }, {
            name: 'Doing',
            color: '222'
        }, {
            name: 'Done',
            color: '333'
        }];

        const BUFFER = 65355;
        const defaultBoard = KanbanList.map((item, index) => ({
            ...item,
            pos: (index + 1) * BUFFER
        }));
        return defaultBoard;
    }

    async createListsFromTemplate(idBoardTemplate: string, idBoard: string): Promise<ListDTO[]> {
        const listData = this.getListTemplateData(idBoardTemplate);
        const response = listData.map(data => this.createList({
            ...data, idBoard
        }));
        return Promise.all(response);
    }
}