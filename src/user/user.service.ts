import { Injectable, HttpException, HttpStatus, Post, Inject, Scope } from '@nestjs/common';
import { UserRepository } from './dto/repository/user.repository';
import { UserEntity } from './dto/entities/user.entity';
import { CreateUser } from '../user/dto/user.create'
import { UpdateUser } from '../user/dto/user.update'
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  // 모든 회원
  getAllUser(): Promise<UserEntity[]> {
    return this.userRepository
      .createQueryBuilder()
      .getMany();
  }

  findOne(user_id: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { user_id } });
  }

  //회원조회
  async getUser(mem_id: number) {
    // const user =  await this.userRepository.findOne(user_id);
    // const mem_id = this.request['user']['id'];
    // console.log(mem_id);
    const data = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.contents', 'contents')
      .where(`user.mem_id = ${mem_id}`)
      .getOne();
    return data;
  }

  //회원 가입
  async createUser(userData: CreateUser) {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user;
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
  async deleteUser(mem_id: number) {
    await this.userRepository
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where("mem_id=:mem_id", { mem_id })
      .execute();
    return '탈퇴가 완료되었습니다.'
  }
}