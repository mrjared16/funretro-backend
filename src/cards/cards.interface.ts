import { CardDTO } from 'src/cards/cards.dto';

export interface CardResponse {
    response: {
        card: CardDTO
    }
}