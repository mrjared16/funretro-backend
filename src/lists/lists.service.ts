import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ListEntity } from './lists.entity';


@Injectable()
export class ListService {
    constructor(private readonly listRepository: Repository<ListEntity>) {

    }

    async createList(boardID: string) {

    }

    async createListsFromTemplate() {
        
    }
}