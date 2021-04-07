import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentRepository } from './dto/repository/content.repository';

@Injectable() // 이 데코레이터가 있으며 모듈로 import를 해줘야 쓸 수 있고 없으면 경로로 import할 수 있는건가.
export class ContentService {
  constructor(
    @InjectRepository(ContentRepository)
    private contentRepository: Repository<ContentRepository>,
  ) { }


  // img insert
  // img delete
  // contents insert
  // contents update
  // contents delete
  // toggle like


  // findAll(): Promise<ContentRepository[]> {
  //   return this.commentRepository.find();
  // }

  // findOne(id: string): Promise<ContentRepository> {
  //   return this.commentRepository.findOne(id);
  // }

  // async remove(id: string): Promise<void> {
  //   await this.commentRepository.delete(id);
  // }

  async uploadFile(body, file) {
    // const result = await this.contentRepository
    // .createQueryBuilder()
    // .insert()
    // .values([
    //   {
    //     content_tag: body.content_tag,
    //     content_text: body.content_text,
    //     content_img: file,
    //   }
    // ])
  }
}