import { AuthService } from './../auth/auth.service';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { UserController } from "./users.controller";
import { User } from "./users.entity";
import { UserService } from "./users.service";



@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})

export class UserModule {

}