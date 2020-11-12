import { UserModule } from './../users/users.module';
import { CardModule } from './../cards/cards.module';
import { ListModule } from './../lists/lists.module';
import { BoardEntity } from 'src/boards/boards.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Module } from "@nestjs/common";
import { BoardController } from './boards.controller';
import { BoardService } from './boards.service';


@Module({
    imports: [TypeOrmModule.forFeature([BoardEntity]), ListModule, CardModule ],
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule { }