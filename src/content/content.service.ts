import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/comment/dto/repository/comment.repository';
import { UserService } from 'src/user/user.service';
import { ContentDto } from './dto/content.dto';
import { ContentEntity } from './dto/entities/content.entity';
import { ContentRepository } from './dto/repository/content.repository';

@Injectable() 
export class ContentService {
  constructor(
    private contentRepository: ContentRepository,
    private commentRepository: CommentRepository,
    private userService: UserService,
  ) { }


  findOne(id: number): Promise<ContentEntity> {
    return this.contentRepository.findOne(id);
  }

  findAll(): Promise<ContentEntity[]> {
    return this.contentRepository.find();
  }



  async getContent () {
    return await this.contentRepository.findOne({where: {content_id:2}, relations: ['user']})
  }

  async uploadFile(body: ContentDto, file, user_id: string) {
    const user = await this.userService.findOne(user_id);
    await this.contentRepository
      .createQueryBuilder()
      .insert()
      .values([
        {
          mem_id: user.mem_id,
          content_tag: body.content_tag,
          content_text: body.content_text,
          content_img: file.path, 
        }
      ]).execute();
      console.log(user)
      return '등록에 성공하였습니다.'
  }


  //글 목록 불러오기
  async getContent_Comment() {
    return await this.commentRepository      
    }
  

  // async uploadContent(body: ContentDto, file, user_id: string) {
  //   const user = await this.userService.findOne(user_id);
  //   await this.contentRepository
  //   .createQueryBuilder()
  //     .insert()
  //     .values([
  //       {
  //         user_id: user.id,
  //         content_tag: body.content_tag,
  //         content_text: body.content_text,
  //         content_img: file.path,
  //       }
  //     ]).execute();
  //     return '등록에 성공하였습니다.'
  // }


  async updateContent(id :number, contentData: ContentDto, file) {
    console.log(contentData)
    await this.contentRepository
      .createQueryBuilder()
      .update(ContentEntity)
      .set(contentData)
      .where("id = :id", {id})
      .execute();
      return '컨텐츠가 수정되었습니다.'    
  }


  async deleteContent(id :number) {
    await this.contentRepository
    .createQueryBuilder()
    .delete()
    .from(ContentEntity)
    .where("id", { id })
    .execute();
    return '삭제가 완료되었습니다.' 
  }

}