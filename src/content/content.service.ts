import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/comment/dto/repository/comment.repository';
import { UserEntity } from 'src/user/dto/entities/user.entity';
import { UserRepository } from 'src/user/dto/repository/user.repository';
import { UserService } from 'src/user/user.service';
import { getRepository } from 'typeorm';
import { ContentDto } from './dto/content.dto';
import { ContentEntity } from './dto/entities/content.entity';
import { ContentRepository } from './dto/repository/content.repository';

@Injectable()
export class ContentService {
  constructor(
    private contentRepository: ContentRepository,
    private commentRepository: CommentRepository,
    private userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  findOne(id: number): Promise<ContentEntity> {
    return this.contentRepository.findOne(id);
  }

  findAll(): Promise<ContentEntity[]> {
    return this.contentRepository.find();
  }

  async getContent() {
    return await this.contentRepository.findOne({ where: { content_id: 2 }, relations: ['user'] });
  }

  //게시글 올리기
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
        },
      ])
      .execute();
    return '등록에 성공하였습니다.';
  }

  //컨텐츠 댓글 보기 // 컨텐츠가 없을 경우 예외처리 하기
  async getContent_comment(content_id) {
    console.log('asdfasdf');
    const comments = await this.userRepository
      .createQueryBuilder('content')
      .leftJoinAndSelect('content.comments', 'comments')
      .where(`contents.content_id=${content_id}`)
      .select(['contents.content_text'])
      .getMany();
    return comments;
  }

  //글 수정
  async updateContent(id: number, contentData: ContentDto, file) {
    console.log(contentData);
    await this.contentRepository
      .createQueryBuilder()
      .update(ContentEntity)
      .set(contentData)
      .where('id = :id', { id })
      .execute();
    return '컨텐츠가 수정되었습니다.';
  }

  //글 삭제
  async deleteContent(content_id, mem_id) {
    console.log(mem_id);
    const member = this.contentRepository.findOne(content_id);
    console.log(member);

    // if
    // await this.contentRepository
    //   .createQueryBuilder()
    //   .delete()
    //   .from(ContentEntity)
    //   .where('content_id', { id })
    //   .execute();
    // return '삭제가 완료되었습니다.';
  }

  //테이블 조인
  async likeUsers(content_id): Promise<ContentEntity> {
    const data = await this.contentRepository.findOne({
      where: { content_id },
      relations: ['users'],
    });
    console.log('asdf', data);
    return data;
  }

  // async validateLike(content_id, req) {
  //   const user_id = req.user.id
  //   const content = await this.likeUsers(content_id)
  //   const member = await this.userRepository.findOne(user_id)
  // }

  //좋아요
  async clickLike(content_id, req): Promise<ContentEntity> {
    const user_id = req.user.id;
    const content: ContentEntity = await this.likeUsers(content_id);
    const member: UserEntity = await this.userRepository.findOne(user_id);
    content.users.push(member);
    console.log(content);
    const data: ContentEntity = await getRepository(ContentEntity).save(content); //.save(content)
    return data;
  }

  //내가 좋아요 한 리스트 불러오기
  async likeList(req) {
    const user_id = req.user.id;
    const [data, total] = await this.contentRepository.findAndCount(user_id);
    const result = {
      data,
      total: total,
    };
    return result;
  }

  //좋아요 취소
  async cancelLike(mem_id, req) {
    const userId = req.user.id;
    await getRepository(UserEntity)
      .createQueryBuilder()
      .relation(UserEntity, 'followers')
      .of(userId)
      .remove(mem_id);
    console.log(userId, mem_id);
  }
}
