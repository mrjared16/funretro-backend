import { BoardResponse, ViewBoardResponse } from './boards.interface';
import { BoardDTO, CreateBoardDTO, UpdateBoardDTO } from './boards.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BoardService } from "./boards.service";

@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: BoardService) {

    }

    @Post()
    async createBoard(@Body() boardData: CreateBoardDTO): Promise<BoardResponse> {
        // get lists info from template [{name: 'To do', color: '#000'}, {name: 'Doing', color: '#100'}, {name: 'Done', color: '#010'}]

        // create board

        // create lists
        const board: BoardDTO = null;
        return {
            response: {
                board
            }
        }
    }

    @Get('/:id')
    async viewBoard(@Param('id') id: string): Promise<ViewBoardResponse> {
        return null;
    }

    @Patch('/:id')
    async updateBoard(@Body() updateData: UpdateBoardDTO): Promise<BoardResponse> {
        const board: BoardDTO = null;
        return {
            response: {
                board
            }
        }
    }

    @Delete('/:id')
    async deleteBoard() {
        
    }
}