import { JWTAuthenticationGuard } from './../auth/guards/jwt.guard';
import { CreateListDTO } from './lists.dto';
import { Body, Delete, UseGuards } from '@nestjs/common';
import { ListDTO, UpdateListDTO } from 'src/lists/lists.dto';
import { ListService } from './lists.service';
import { Controller, Param, Patch, Post } from '@nestjs/common';
import { ListResponse } from './lists.interface';
import { DeleteResponse } from 'src/shared/interface';

@Controller('lists')
export class ListController {
    constructor(private readonly listService: ListService) {

    }

    @Post()
    @UseGuards(JWTAuthenticationGuard)
    async createList(@Body() listData: CreateListDTO): Promise<ListResponse> {
        const list: ListDTO = await this.listService.createList(listData);
        return {
            response: {
                list
            }
        }
    }

    @Patch(':id')
    @UseGuards(JWTAuthenticationGuard)
    async updateList(@Param('id') id: string, @Body() updateData: UpdateListDTO): Promise<ListResponse> {
        const list: ListDTO = await this.listService.updateList(id, updateData);
        return {
            response: {
                list
            }
        }
    }

    @Delete(':id')
    @UseGuards(JWTAuthenticationGuard)
    async deleteList(@Param('id') id: string): Promise<DeleteResponse> {
        const isSuccess = await this.listService.deleteList(id);
        return {
            response: {
                message: (isSuccess ? 'Success' : 'Fail')
            }
        }
    }
}