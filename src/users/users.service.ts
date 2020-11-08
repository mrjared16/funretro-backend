import { User } from './users.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { UserDto } from "./users.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) {
    }


    async findUserByUsername(username: string) {
        return await this.userRepository.findOne({ where: { username } });
    }

    async createUser(data: UserDto) {
        let newUser = await this.userRepository.create(data);
        // console.log({ newUser, data });
        return await this.userRepository.save(newUser);
    }

    async findUserById(id: number) {
        return await this.userRepository.findOne({ where: { id } });
    }

    async updateUser(id: string, newUserInfo: Partial<UserDto>) {
        await this.userRepository.update({ id }, newUserInfo);
        return await this.userRepository.findOne({ id });
    }
}