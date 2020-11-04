import { UserModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(), AuthModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [UserModule]
})
export class AppModule {
  constructor(private connection: Connection) {

  }
}
