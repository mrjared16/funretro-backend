import { CardModule } from './cards/cards.module';
import { ListModule } from './lists/lists.module';
import { BoardModule } from './boards/boards.module';
import { UserModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Config } from './shared/config';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(Config.getTypeORMConfig()), AuthModule, BoardModule, ListModule, CardModule],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {
  constructor(private connection: Connection) {

  }
}
