import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './dto/repository/comment.repository';
// import { CommentRepository } from '../_dao/--repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
