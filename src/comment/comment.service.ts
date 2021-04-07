import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentRepository } from './dto/repository/comment.repository';
// import { CommentRepository } from '../_dao/--repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: Repository<CommentRepository>,
  ) {}

//   constructor(
//     private readonly commentRepository : CommentRepository
// ){}

  findAll(): Promise<CommentRepository[]> {
    return this.commentRepository.find();
  }

  findOne(id: string): Promise<CommentRepository> {
    return this.commentRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }
}