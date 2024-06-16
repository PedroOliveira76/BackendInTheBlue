// src/user/user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Importa a entidade User para uso no módulo
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
