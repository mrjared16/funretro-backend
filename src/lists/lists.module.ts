import { ListController } from './lists.controller';
import { ListService } from './lists.service';
import { ListEntity } from 'src/lists/lists.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([ListEntity])],
    providers: [ListService],
    controllers: [ListController],
    exports: [ListService]
})
export class ListModule { }