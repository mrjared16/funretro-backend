import { DeleteResponse } from './../shared/interface';
import { JWTAuthenticationGuard } from './../auth/guards/jwt.guard';
import { RequestWithToken } from './../auth/auth.interface';
import { CardService } from './../cards/cards.service';
import { ListService } from './../lists/lists.service';
import { ListDTO } from 'src/lists/lists.dto';
import { BoardResponse, ViewAllBoardResponse, ViewBoardResponse } from './boards.interface';
import { BoardDTO, CreateBoardDTO, UpdateBoardDTO, BoardData } from './boards.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { BoardService } from "./boards.service";

@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: BoardService,
        private readonly listService: ListService,
        private readonly cardService: CardService
    ) {

    }


    @Get()
    @UseGuards(JWTAuthenticationGuard)
    async getAllBoard(@Req() request: RequestWithToken): Promise<ViewAllBoardResponse> {
        const { user } = request;
        const { userId } = user;

        const boards: BoardDTO[] = await this.boardService.getAllBoard(userId);

        return {
            response: {
                boards
            }
        }
    }

    @Post()
    @UseGuards(JWTAuthenticationGuard)
    async createBoard(@Req() request: RequestWithToken, @Body() boardData: CreateBoardDTO): Promise<BoardResponse> {
        // create board
        const { user } = request;
        const { userId } = user;
        const board: BoardDTO = await this.boardService.createBoard(boardData, userId);

        // create lists
        const { idBoardTemplate } = boardData;
        const lists: ListDTO[] = await this.listService.createListsFromTemplate(idBoardTemplate, board.id);

        return {
            response: {
                board
            }
        }
    }

    @Get(':id')
    @UseGuards(JWTAuthenticationGuard)
    async viewBoard(@Param('id') id: string): Promise<ViewBoardResponse> {
        const board = await this.boardService.getBoard(id);
        return {
            response: {
                board
            }
        };

    }

    @Patch(':id')
    @UseGuards(JWTAuthenticationGuard)
    async updateBoard(@Param('id') id: string, @Body() updateData: UpdateBoardDTO): Promise<BoardResponse> {
        const board: BoardDTO = await this.boardService.updateBoard(id, updateData);
        return {
            response: {
                board
            }
        }
    }

    @Delete(':id')
    @UseGuards(JWTAuthenticationGuard)
    async deleteBoard(@Param('id') id: string): Promise<DeleteResponse> {
        const isSuccess = await this.boardService.deleteBoard(id);
        return {
            response: {
                message: (isSuccess ? 'Success' : 'Fail')
            }
        }
    }
}