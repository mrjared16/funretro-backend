import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CardEntity } from './cards.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardEntity)
        private cardRepository: Repository<CardEntity>) { }

}