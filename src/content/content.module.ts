import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from 'src/comment/comment.service';
import { CommentRepository } from 'src/comment/dto/repository/comment.repository';
import { UserRepository } from 'src/user/dto/repository/user.repository';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ContentRepository } from './dto/repository/content.repository';


@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository, CommentRepository, UserRepository]), UserModule
  ],
  controllers: [ContentController],
  providers: [ContentService, CommentService, UserService],
})
export class ContentModule { }
