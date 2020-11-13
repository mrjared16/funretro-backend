import { UserEntity } from './users.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "./users.dto";
import { RequestWithToken } from 'src/auth/auth.interface';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>) {
    }

    async validateUser(email: string, password: string): Promise<UserDTO> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new HttpException('Wrong email or password ', HttpStatus.BAD_REQUEST);
        }
        const isPasswordMatching = await UserEntity.comparePassword(password, user.password);
        if (!isPasswordMatching) {
            throw new HttpException('Wrong email or password ', HttpStatus.BAD_REQUEST);
        }
        return UserDTO.EntityToDTO(user);
    }

    async findUser(payload: { email?: string, id?: string } = {}) {
        const user = await this.userRepository.findOne({ where: payload });
        return UserDTO.EntityToDTO(user);
    }

    async createUser(data: CreateUserDTO): Promise<UserDTO> {
        const { email, name, password } = data;

        const userWithThisEmail = await this.userRepository.findOne({ where: { email } });
        if (userWithThisEmail != null) {
            throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
        }

        let newUser = await this.userRepository.create({ email, name, password });
        await this.userRepository.save(newUser);
        return UserDTO.EntityToDTO(newUser);
    }

    async updateUser(id: string, newUserInfo: UpdateUserDTO): Promise<UserDTO> {
        try {
            const user = await this.userRepository.findOne({ id });

            const { name } = newUserInfo;
            Object.assign(user, { name });

            await this.userRepository.save(user);

            return UserDTO.EntityToDTO(user);
        } catch (e) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }
}