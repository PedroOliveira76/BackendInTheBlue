
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'; 
import { User } from './user/user.entity'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'loc@l',
      database: 'intheblue',
      entities: [User],
      synchronize: true,
    }),
    UserModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
