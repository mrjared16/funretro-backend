import { UserEntity } from 'src/users/users.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BoardData, BoardDTO, UpdateBoardDTO } from './boards.dto';
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