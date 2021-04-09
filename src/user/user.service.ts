import { Injectable, HttpException, HttpStatus, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './dto/repository/user.repository';
import { UserEntity } from './dto/entities/user.entity';
import { CreateUser } from '../user/dto/user.create'
import { UpdateUser } from '../user/dto/user.update'
import { stringify } from 'node:querystring';
import { timeStamp } from 'node:console';
import { LoginUserDto } from './dto/user.login'
import { UserDto } from './dto/user.dto'
import * as bcrypt from 'bcrypt';

@Injectable()
export class  UserService {
    constructor(
    private readonly userRepository : UserRepository,
){}

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
  async getUser (user_id :string) {
    const user =  await this.userRepository.findOne(user_id);
    // console.log(user)
    return user;
  }

  //회원 가입
  async createUser(userData: CreateUser) {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user;
}


  //회원 정보 수정
  async updateUser(id :number, userData: UpdateUser) {
    await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set(userData)
      .where("id = :id", {id})
      .execute();
      return '정보가 수정되었습니다.'    
  }

  //회원 탈퇴
  async deleteUser(id :number) {
    await this.userRepository
    .createQueryBuilder()
    .delete()
    .from(UserEntity)
    .where("id", { id })
    .execute();
    return '탈퇴가 완료되었습니다.' 
  }


}


