import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentEntity } from './dto/entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private commentRepository: Repository<ContentEntity>,
  ) {}


  // img insert
  // img delete
  // contents insert
  // contents update
  // contents delete
  // toggle like
  

  findAll(): Promise<ContentEntity[]> {
    return this.commentRepository.find();
  }

  findOne(id: string): Promise<ContentEntity> {
    return this.commentRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }
}