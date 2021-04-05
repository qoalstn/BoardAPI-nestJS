import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './dto/repository/user.repository';
import { UserEntity } from './dto/entities/user.entity';
import { CreateUser } from '../user/dto/user.create'
import { UpdateUser } from '../user/dto/user.update'
import { stringify } from 'node:querystring';
import { timeStamp } from 'node:console';

@Injectable()
export class  UserService {
    constructor(
    private readonly userRepository : UserRepository
){}

// 모든 회원
  getAllUser(): Promise<UserEntity[]> {
    return this.userRepository
    .createQueryBuilder()
    .getMany();
  }

  //회원조회
  async getUser (user_id :string) {
    // const user = await this.userRepository
    // .createQueryBuilder()
    // .where("id = :id", {id})
	  // .getOne();
    // return user;

    const user =  await this.userRepository.findOne(user_id);
    // console.log(user)
    return user;
  }

  //회원 가입
  async createUser(userData: CreateUser) {
  //--case1 
    // return this.userRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .values([
    //     {
    //       user_id : userData.user_id,
    //       user_pw : userData.user_pw,
    //       user_email : userData.user_email,
    //       user_regdate : userData.user_regdate
    //     },
    //   ])
    //   .execute();
//---case2
    // const user = this.getUser (user_id)
    // if(user !== null ) {
    //   return '이미 가입 된 아이디입니다.';
    // } else {
    //   await this.userRepository.save(userData);
    //   return '등록에 성공하였습니다.';
    // }
//--case3
await this.userRepository.save(userData);
        return '등록에 성공하였습니다.';    
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
  async deleteUser(user_id :string) {
    await this.userRepository
    .createQueryBuilder()
    .delete()
    .from(UserEntity)
    .where("user_id = :user_id", { user_id })
    .execute();
    return '탈퇴가 완료되었습니다.' 
  }

  //로그인 유효성
  async loginUser(user_id :string) {
    await this.userRepository
    
    return '로그인 성공' 
  }
  









  // findOne(id: string): Promise<UserEntity> {
  //   return this.userRepository.findOne(id);
  // }

  // async remove(id: string): Promise<void> {
  //   await this.userRepository.delete(id);
  // }
}


