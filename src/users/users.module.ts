import { AuthModule } from './../auth/auth.module';
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { UserController } from "./users.controller";
import { User } from "./users.entity";
import { UserService } from "./users.service";



@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})

export class UserModule {

}