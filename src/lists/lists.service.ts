import { BoardEntity } from 'src/boards/boards.entity';
import { ListData, ListDTO, UpdateListDTO } from 'src/lists/lists.dto';
import { CreateListDTO } from './lists.dto';
import { Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ListEntity } from './lists.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ListService {
    constructor(
        @InjectRepository(ListEntity)
        private readonly listRepository: Repository<ListEntity>) {

    }

    async createList(data: CreateListDTO): Promise<ListDTO> {
        const { name, color, pos, idBoard } = data;
        const board = { id: idBoard };

        const list = this.listRepository.create({ name, color, pos, board: board as BoardEntity });
        const newList = await this.listRepository.save(list);

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

    async updateList(id: string, data: UpdateListDTO): Promise<ListDTO> {
        try {
            console.log({ id, data });
            const list = await this.listRepository.findOne({ id: id }, { loadRelationIds: { relations: ['board'] } });
            // const list = await this.listRepository.createQueryBuilder('list')
            //     .leftJoinAndSelect('list.board', 'board')
            //     .where('list.id = :id', { id })
            //     .getQuery();
            // const list = await this.listRepository.createQueryBuilder('list')
            //     .leftJoinAndSelect('list."boardId"', '"boardId"')
            //     .where('list.id = :id', { id })
            //     .getOne();
            const board = { id: list.board as any };
            list.board = board as BoardEntity;
            console.log({ list });
            if (!list) {
                throw new HttpException('List not found', HttpStatus.NOT_FOUND);
            }

            const { name, pos, color } = { ...list, ...data };
            Object.assign(list, { name, pos, color });

            const newList = await this.listRepository.save(list);
            console.log({ list, newList });

            return ListDTO.EntityToDTO(newList);
        } catch (Exception) {
            if (Exception && Exception instanceof HttpException) {
                throw Exception;
            }
            console.log({ Exception });
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteList(id: string): Promise<boolean> {
        // const response = await this.listRepository.softDelete({ id });
        const response = await this.listRepository.restore({ id });
        const { affected } = response;
        return (affected > 0);
    }
}