import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { ContentModule } from './content/content.module';

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
      synchronize: false,
    }),
    UserModule,
    CommentModule,
    ContentModule
  ],
})
export class AppModule {}
