import { BoardEntity } from 'src/boards/boards.entity';
import { ListEntity } from 'src/lists/lists.entity';
import { UpdateCardDTO, CreateCardDTO } from 'src/cards/cards.dto';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CardEntity } from './cards.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CardDTO } from './cards.dto';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardEntity)
        private cardRepository: Repository<CardEntity>) {

    }

    async createCard(data: CreateCardDTO): Promise<CardDTO> {
        const { idBoard, idList, name, pos } = data;
        const card = await this.cardRepository.create({ list: { id: idList } as ListEntity, name, pos });
        const newCard = await this.cardRepository.save(card);
        return CardDTO.EntityToDTO({
            ...newCard,
            list: {
                ...newCard.list,
                board: {
                    id: idBoard
                } as BoardEntity
            }
        });
    }

    async updateCard(id: string, data: UpdateCardDTO): Promise<CardDTO> {
        try {
            const card = await this.cardRepository.findOne({ id: id });
            // const list = await this.cardRepository.createQueryBuilder('list')
            //     .where('list.id = :id', { id })
            //     .getOne();
            if (!card) {
                throw new HttpException('List not found', HttpStatus.NOT_FOUND);
            }

            const { name, pos, idList } = { ...card, ...data };
            Object.assign(card, {
                name, pos, list: {
                    id: idList,
                    // board: {
                    //     id: ''
                    // } as BoardEntity
                } as ListEntity
            });
            // TODO: add idBoard
            const newList = await this.cardRepository.save(card);

            return CardDTO.EntityToDTO(newList);
        } catch (Exception) {
            if (Exception && Exception instanceof HttpException) {
                throw Exception;
            }
            console.log({ Exception });
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteCard(id: string): Promise<boolean> {
        const response = await this.cardRepository.softDelete({ id });
        // const response = await this.cardRepository.restore({ id });
        const test = await this.cardRepository.findOne({ id });
        const test2 = await this.cardRepository.createQueryBuilder('card').where('card.id = :id', { id: id }).getOne();

        console.log({ test, test2 });
        const { affected } = response;
        return (affected > 0);
    }
}