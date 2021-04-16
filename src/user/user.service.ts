import { Injectable, HttpException, HttpStatus, Post, Inject, Scope } from '@nestjs/common';
import { UserRepository } from './dto/repository/user.repository';
import { UserEntity } from './dto/entities/user.entity';
import { CreateUser } from '../user/dto/user.create';
import { UpdateUser } from '../user/dto/user.update';
import { getRepository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { LoginCredential } from 'src/auth/dto/login-credential.dto';
import * as bcrypt from 'bcrypt';
import { exception } from 'node:console';

@Injectable()
export class UserService {
  constructor(
    // @Inject(REQUEST) private readonly request: Request,
    // @Inject(REQUEST) private request: Request,
    private readonly userRepository: UserRepository,
  ) {}

  findOne(user_id: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { user_id } });
  }

  getAllUser(): Promise<UserEntity[]> {
    // console.log(this.request);
    return this.userRepository.createQueryBuilder().getMany();
  }

  //회원 가입
  async createUser(userData: CreateUser) {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user;
  }

  //내가 쓴 게시글 조회
  async getUser_Content(mem_id: number) {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.contents', 'contents')
      .where(`user.mem_id = ${mem_id}`)
      .select(['user.mem_id', 'user.user_id', 'contents'])
      .getOne();
    return data;
  }

  //내가 쓴 댓글 보기
  async getUser_Comment(mem_id: string) {
    const comments = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.comments', 'comments')
      .where(`user.mem_id = ${mem_id}`)
      .select(['user.mem_id', 'user.user_id', 'comments.comment_text'])
      .getMany();
    return comments;
  }

  //회원 정보 수정
  async updateUser(id: number, userData: UpdateUser) {
    await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set(userData)
      .where('id = :id', { id })
      .execute();
    return '정보가 수정되었습니다.';
  }

  //회원 탈퇴
  async deleteUser(mem_id: number, req) {
    const loginUser = req.user.id;
    if (mem_id == loginUser) {
      await this.userRepository
        .createQueryBuilder()
        .delete()
        .from(UserEntity)
        .where('mem_id = :mem_id', { mem_id })
        .execute();
      return '탈퇴가 완료되었습니다.';
    } else {
      return '로그인 정보가 일치하지 않습니다.';
    }
  }

  async followGroup(mem_id) {
    const data = await this.userRepository.findOne({
      where: { mem_id },
      relations: ['followers'],
    });
    return data;
  }

  //팔로우 여부 확인,
  async follow(followId, req) {
    console.log('asdf');
    const loginId = req.user.id; // 로그인유저 pk
    const user = await this.followGroup(loginId); //로그인유저 Entity
    console.log(user);
    if (followId == loginId) {
      return '본인은 팔로우 할 수 없습니다.';
    } else {
      for (const follower of user.followers) {
        if (follower.mem_id == followId) {
          return '이미 팔로우 된 아이디 입니다.';
        }
      }
      // mem_id_1 = 로그인한 아이디
      // mem_id_2 =  팔로우아이디
      const member = await this.userRepository.findOne(followId);
      user.followers.push(member);
      await getRepository(UserEntity).save(user);
      return '팔로우';
    }
  }

  //언팔로우
  async unfollow(followId, req) {
    const loginId = req.user.id; // 접속 유저 pk
    const user = await this.followGroup(loginId);

    for (const follower of user.followers) {
      console.log('asdf11');
      if (follower.mem_id == followId) {
        await getRepository(UserEntity)
          .createQueryBuilder()
          .relation(UserEntity, 'followers')
          .of(loginId)
          .remove(followId);
      } else {
        return '팔로우 되지 않은 아이디입니다.';
      }
    }
  }
}
