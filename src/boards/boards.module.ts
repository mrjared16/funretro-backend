import { BoardEntity } from 'src/boards/boards.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Module } from "@nestjs/common";
import { BoardController } from './boards.controller';
import { BoardService } from './boards.service';


@Module({
    imports: [TypeOrmModule.forFeature([BoardEntity])],
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule { }