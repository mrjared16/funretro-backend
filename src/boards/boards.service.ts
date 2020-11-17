import { UserEntity } from 'src/users/users.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BoardData, BoardDetailDTO, BoardDTO, UpdateBoardDTO } from './boards.dto';
import { BoardEntity } from './boards.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>
    ) {

    }

    async getAllBoard(idUser: string): Promise<BoardDTO[]> {
        const boards = await this.boardRepository.createQueryBuilder('board')
            .select()
            .where('board.userId = :userId', { userId: idUser })
            .orderBy('created_at', 'ASC')
            .getMany();

        return boards.map((board) => BoardDTO.EntityToDTO(board));
    }

    async getBoard(idBoard: string): Promise<BoardDetailDTO> {
        // const boardEntity = await this.boardRepository.findOne({ id: idBoard }, { relations: ['lists', 'lists.cards']})
        const boardEntity = await this.boardRepository.createQueryBuilder('board')
            .leftJoinAndSelect('board.lists', 'list')
            .leftJoinAndSelect('list.cards', 'card')
            .where('board.id = :id', { id: idBoard })
            .orderBy({
                'list.pos': 'ASC',
                'card.pos': 'ASC'
            })
            .getOne();
        //TypeOrm doesnot support outer join => manual filter in DTOs
        // const test = await this.boardRepository.query(`
        // SELECT "board"."id" AS "board_id", "board"."name" AS "board_name", "board"."permissionLevel" AS "board_permissionLevel", "board"."deleted_at" AS "board_deleted_at", "board"."created_at" AS "board_created_at", "board"."updated_at" AS "board_updated_at", "board"."userId" AS "board_userId", 
        //     "list"."id" AS "list_id", "list"."name" AS "list_name", "list"."color" AS "list_color", "list"."pos" AS "list_pos", "list"."delete_at" AS "list_delete_at", "list"."created_at" AS "list_created_at", "list"."updated_at" AS "list_updated_at", "list"."boardId" AS "list_boardId",
        //     "card"."id" AS "card_id", "card"."name" AS "card_name", "card"."pos" AS "card_pos", "card"."delete_at" AS "card_delete_at", "card"."created_at" AS "card_created_at", "card"."updated_at" AS "card_updated_at", "card"."listId" AS "card_listId"
        // FROM "board" "board" 
        //     FULL OUTER JOIN "list" "list" ON "list"."boardId"="board"."id" AND "list"."delete_at" IS NULL
        //     FULL OUTER JOIN "card" "card" ON "card"."listId"="list"."id" AND "card"."delete_at" IS NULL
        // WHERE ( "board"."id" = $1 AND "board"."deleted_at" IS NULL) ORDER BY "list"."pos" ASC, "card"."pos" ASC
        // `, [idBoard]);
        const boardDTO = BoardDetailDTO.EntityToDTO(boardEntity);
        return boardDTO as BoardDetailDTO;
    }

    async createBoard(boardData: BoardData, idUser: string): Promise<BoardDTO> {
        const { name } = boardData;
        const user = { id: idUser };
        const board = await this.boardRepository.create({ name, user: user as UserEntity });

        const newBoard = await this.boardRepository.save(board);

        return BoardDTO.EntityToDTO(newBoard);
    }

    async updateBoard(idBoard: string, newBoardData: UpdateBoardDTO): Promise<BoardDTO> {
        try {
            const board: BoardEntity = await this.boardRepository.findOne({ id: idBoard });
            if (!board) {
                throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
            }

            const { name, permissionLevel } = { ...board, ...newBoardData };
            Object.assign(board, { name, permissionLevel });

            const newBoard = await this.boardRepository.save(board);

            return BoardDTO.EntityToDTO(newBoard);
        } catch (e) {
            if (e && e instanceof HttpException) {
                throw e;
            }
            console.log({ Exeception: e });
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteBoard(idBoard: string): Promise<boolean> {
        const response = await this.boardRepository.softDelete({ id: idBoard });
        // const response = await this.boardRepository.restore({ id: idBoard });
        // console.log({ response });
        const { affected } = response;
        return (affected > 0)
    }
}