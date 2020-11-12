import { CardService } from './cards.service';
import { CardController } from './cards.controller';
import { CardEntity } from 'src/cards/cards.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Module } from '@nestjs/common';


@Module({
    imports: [TypeOrmModule.forFeature([CardEntity])],
    providers: [CardService],
    controllers: [CardController],
    exports: [CardService]
})
export class CardModule { }