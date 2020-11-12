import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CardEntity } from './cards.entity';

@Injectable()
export class CardService {
    constructor(private cardRepository: Repository<CardEntity>) { }

}