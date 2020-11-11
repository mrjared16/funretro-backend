import { UserEntity } from './users.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { CreateUserDto, UpdateUserDto, UserDto } from "./users.dto";
import { RequestWithToken } from 'src/auth/auth.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>) {
    }

    async validateUser(email: string, password: string): Promise<UserDto> {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            const isPasswordMatching = await UserEntity.comparePassword(password, user.password);
            if (!isPasswordMatching) {
                throw new HttpException('Wrong email or password ', HttpStatus.BAD_REQUEST);
            }
            return user.toDTO();
        } catch (error) {
            throw new HttpException('Wrong email or password ', HttpStatus.BAD_REQUEST);
        }
    }

    async findUserById(id: number): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { id } });
        return user.toDTO();
    }

    async createUser(data: CreateUserDto): Promise<UserDto> {
        const { email, name, password } = data;

        const userWithThisEmail = await this.userRepository.findOne({ where: { email } });
        if (userWithThisEmail != null) {
            throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
        }

        let newUser = await this.userRepository.create({ email, name, password });
        await this.userRepository.save(newUser);
        return newUser.toDTO();
    }

    async updateUser(id: string, newUserInfo: UpdateUserDto): Promise<UserDto> {
        try {
            await this.userRepository.update({ id }, newUserInfo);

            const user = await this.userRepository.findOne({ id });
            return user.toDTO();
        } catch (e) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }
}