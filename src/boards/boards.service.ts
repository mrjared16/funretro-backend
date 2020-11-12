import { UserEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BoardData, BoardDTO } from './boards.dto';
import { BoardEntity } from './boards.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>
    ) {

    }

    async createBoard(boardData: BoardData, idUser: string): Promise<BoardDTO> {
        const { name } = boardData;
        const user = { id: idUser };
        const newBoard = await this.boardRepository.create({ name, user: user as UserEntity });
        await this.boardRepository.save(newBoard);
        return BoardDTO.EntityToDTO(newBoard);
    }
}