import { Body, Delete } from '@nestjs/common';
import { CardDTO, CreateCardDTO, UpdateCardDTO } from 'src/cards/cards.dto';
import { CardService } from './cards.service';
import { Controller, Param, Patch, Post } from '@nestjs/common';
import { CardResponse } from './cards.interface';

@Controller('cards')
export class CardController {
    constructor(private readonly cardService: CardService) {

    }

    @Post()
    async createCard(@Body() cardData: CreateCardDTO): Promise<CardResponse> {
        const card: CardDTO = null;
        return {
            response: {
                card
            }
        }
    }

    @Patch('/:id')
    async updateCard(@Param('id') id: string, @Body() data: UpdateCardDTO): Promise<CardResponse> {
        const card: CardDTO = null;
        return {
            response: {
                card
            }
        }
    }

    @Delete('/:id')
    async deleteCard(@Param('id') id: string) {

    }
}