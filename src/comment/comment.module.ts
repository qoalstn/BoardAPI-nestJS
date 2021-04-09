import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from 'src/content/dto/repository/content.repository';
import { UserRepository } from 'src/user/dto/repository/user.repository';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './dto/repository/comment.repository'
// import { CommentRepository } from '../_dao/--repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository, ContentRepository, UserRepository])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
