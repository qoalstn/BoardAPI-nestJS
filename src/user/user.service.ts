import { Injectable, HttpException, HttpStatus, Post, Inject, Scope } from '@nestjs/common';
import { UserRepository } from './dto/repository/user.repository';
import { UserEntity } from './dto/entities/user.entity';
import { CreateUser } from '../user/dto/user.create'
import { UpdateUser } from '../user/dto/user.update'
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { LoginCredential } from 'src/auth/dto/login-credential.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    // @Inject(REQUEST) private readonly request: Request,
    @Inject(REQUEST) private request: Request,
    private readonly userRepository: UserRepository,
  ) { }

  findOne(user_id: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { user_id } });
  }

  // 모든 회원
  getAllUser(): Promise<UserEntity[]> {
    console.log(this.request);
    return this.userRepository
      .createQueryBuilder()
      .getMany();
  }

  //회원 가입
  async createUser(userData: CreateUser) {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user;
  }

  //회원 게시글 조회
  async getUser_Content(mem_id: number) {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.contents', 'contents')
      .where(`user.mem_id = ${mem_id}`)
      .select(['user.mem_id', 'user.user_id', 'contents'])
      .getOne();
    return data;
  }

  //댓글 보기
  async getUser_Comment(mem_id: string) {
    const comments = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.comments', 'comments')
      .where(`user.mem_id = ${mem_id}`)
      .select(['user.mem_id', 'user.user_id', 'comments.comment_text'])
      .getMany();
    return comments
  }

  //회원 정보 수정
  async updateUser(id: number, userData: UpdateUser) {
    await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set(userData)
      .where("id = :id", { id })
      .execute();
    return '정보가 수정되었습니다.'
  }

  //회원 탈퇴
  async deleteUser(mem_id: number, req) {
    const loginUser = req.user.id
    if (mem_id == loginUser) {
      await this.userRepository
        .createQueryBuilder()
        .delete()
        .from(UserEntity)
        .where("mem_id = :mem_id", { mem_id })
        .execute();
      return '탈퇴가 완료되었습니다.'
    } else {
      return '로그인 정보가 일치하지 않습니다.'
    }
  }
}