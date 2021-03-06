import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { ContentModule } from './content/content.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { type } from 'node:os';
// import { AppService } from './--app.service'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3300,
      username: 'root',
      password: 'admin',
      database: 'todolist',
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    UserModule,
    CommentModule,
    ContentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
