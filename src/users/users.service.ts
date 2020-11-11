import { UserEntity } from './users.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { CreateUserDto, UpdateUserDto, UserDto } from "./users.dto";
import { RequestWithToken } from 'src/auth/auth.interface';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>) {
    }

    async validateUser(email: string, password: string): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new HttpException('Wrong email or password ', HttpStatus.BAD_REQUEST);
        }
        const isPasswordMatching = await UserEntity.comparePassword(password, user.password);
        if (!isPasswordMatching) {
            throw new HttpException('Wrong email or password ', HttpStatus.BAD_REQUEST);
        }
        return UserDto.EntityToDTO(user);
    }

    async findUser(payload: { email?: string, id?: string } = {}) {
        const user = await this.userRepository.findOne({ where: payload });
        return UserDto.EntityToDTO(user);
    }

    async createUser(data: CreateUserDto): Promise<UserDto> {
        const { email, name, password } = data;

        const userWithThisEmail = await this.userRepository.findOne({ where: { email } });
        if (userWithThisEmail != null) {
            throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
        }

        let newUser = await this.userRepository.create({ email, name, password });
        await this.userRepository.save(newUser);
        return UserDto.EntityToDTO(newUser);
    }

    async updateUser(id: string, newUserInfo: UpdateUserDto): Promise<UserDto> {
        try {
            await this.userRepository.update({ id }, newUserInfo);

            const user = await this.userRepository.findOne({ id });
            return UserDto.EntityToDTO(user);
        } catch (e) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }
}