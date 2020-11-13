import { JWTAuthenticationGuard } from './../auth/guards/jwt.guard';
import { Body, Delete, UseGuards } from '@nestjs/common';
import { CardDTO, CreateCardDTO, UpdateCardDTO } from 'src/cards/cards.dto';
import { CardService } from './cards.service';
import { Controller, Param, Patch, Post } from '@nestjs/common';
import { CardResponse } from './cards.interface';
import { DeleteResponse } from 'src/shared/interface';

@Controller('cards')
export class CardController {
    constructor(private readonly cardService: CardService) {

    }

    @Post()
    @UseGuards(JWTAuthenticationGuard)
    async createCard(@Body() cardData: CreateCardDTO): Promise<CardResponse> {
        const card: CardDTO = await this.cardService.createCard(cardData);
        return {
            response: {
                card
            }
        }
    }

    @Patch('/:id')
    @UseGuards(JWTAuthenticationGuard)
    async updateCard(@Param('id') id: string, @Body() data: UpdateCardDTO): Promise<CardResponse> {
        const card: CardDTO = await this.cardService.updateCard(id, data);
        return {
            response: {
                card
            }
        }
    }

    @Delete('/:id')
    @UseGuards(JWTAuthenticationGuard)
    async deleteCard(@Param('id') id: string): Promise<DeleteResponse> {
        const isSuccess = await this.cardService.deleteCard(id);
        return {
            response: {
                message: (isSuccess ? 'Success' : 'Fail')
            }
        }
    }
}