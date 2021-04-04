import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../_dto/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  findAll(): Promise<CommentEntity[]> {
    return this.commentRepository.find();
  }

  findOne(id: string): Promise<CommentEntity> {
    return this.commentRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }
}