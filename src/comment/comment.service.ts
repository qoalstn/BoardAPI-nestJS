import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentRepository } from './dto/repository/comment.repository';
import { CommentDto } from './comment.dto'
import { CommentEntity } from './dto/entities/comment.entity';
import { ContentEntity } from 'src/content/dto/entities/content.entity';
import { ContentRepository } from 'src/content/dto/repository/content.repository';
import { UserRepository } from 'src/user/dto/repository/user.repository';
// import { CommentRepository } from '../_dao/--repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly contentRepository: ContentRepository,
    private readonly userRepository: UserRepository
  ) {}

//   constructor(
//     private readonly commentRepository : CommentRepository
// ){}

  findAll(): Promise<CommentEntity[]> {
    return this.commentRepository.find();
  }

  findOne(id: number): Promise<ContentEntity> {
    return this.contentRepository.findOne(id);
  }


  async sendComment (body : CommentDto, id ) {
    const user = await this.userRepository.findOne(id);
    const content = await this.contentRepository.findOne(id);
    console.log(content)
    await this.commentRepository
      .createQueryBuilder()
      .insert()
      .values([
        {
          mem_id: user.mem_id,
          content_id : content.content_id,
          comment_text : body.comment_text,
          comment_like: body.comment_like
        }
      ]).execute();
      return '등록에 성공하였습니다.'  
  }

  async remove(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }
}