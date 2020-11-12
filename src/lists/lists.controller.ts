import { CreateListDTO } from './lists.dto';
import { Body, Delete } from '@nestjs/common';
import { ListDTO, UpdateListDTO } from 'src/lists/lists.dto';
import { ListService } from './lists.service';
import { Controller, Param, Patch, Post } from '@nestjs/common';
import { ListResponse } from './lists.interface';

@Controller('lists')
export class ListController {
    constructor(private readonly listService: ListService) {

    }

    @Post()
    async createList(@Body() listData: CreateListDTO ): Promise<ListResponse> {
        const list: ListDTO = null;
        return {
            response: {
                list
            }
        }
    }

    @Patch('/:id')
    async updateList(@Param('id') id: string, @Body() updateData: UpdateListDTO): Promise<ListResponse> {
        const list: ListDTO = null;
        return {
            response: {
                list
            }
        }
    }

    @Delete('/:id')
    async deleteList(@Param('id') id: string) {
        
    }
}