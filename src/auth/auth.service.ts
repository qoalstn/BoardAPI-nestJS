// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { AuthRepository } from './dto/repository/user.repository';
// import { AuthEntity } from './dto/entities/user.entity';
// import { CreateUser } from '../user/dto/user.create'
// import { UpdateUser } from '../user/dto/user.update'
// import { stringify } from 'node:querystring';
// import { timeStamp } from 'node:console';

// @Injectable()
// export class  AuthService {
//     constructor(
//     private readonly authRepository : AuthRepository
// ){}

// //// 모든 회원
//   // getAllUser(): Promise<UserEntity[]> {
//   //   return this.userRepository
//   //   .createQueryBuilder()
//   //   .getMany();
//   // }

//   //회원조회
//   async getUser (user_id :string) {
//     // const user = await this.userRepository
//     // .createQueryBuilder()
//     // .where("id = :id", {id})
// 	  // .getOne();
//     // return user;

//     const user =  await this.authRepository.findOne(user_id);
//     // console.log(user)
//     return user;
//   }

//   //회원 가입
//   async createUser(userData: CreateUser) {
//     // return this.userRepository
//     //   .createQueryBuilder()
//     //   .insert()
//     //   .values([
//     //     {
//     //       user_id : userData.user_id,
//     //       user_pw : userData.user_pw,
//     //       user_email : userData.user_email,
//     //       user_regdate : userData.user_regdate
//     //     },
//     //   ])
//     //   .execute();

//     await this.authRepository.save(userData);
//     return '등록에 성공하였습니다.';
//   }

//   //회원 정보 수정
//   async updateUser(id :number, userData: UpdateUser) {
//     await this.authRepository
//       .createQueryBuilder()
//       .update(AuthEntity)
//       .set(userData)
//       .where("id = :id", {id})
//       .execute();
//       return '정보가 수정되었습니다.'    
//   }

//   //회원 탈퇴
//   async deleteUser(user_id :string) {
//     await this.authRepository
//     .createQueryBuilder()
//     .delete()
//     .from(AuthEntity)
//     .where("user_id = :user_id", { user_id })
//     .execute();
//     return '탈퇴가 완료되었습니다.' 
//   }

//   //로그인 유효성
//   async loginUser(user_id :string) {
//     await this.authRepository
    
//     return '탈퇴가 완료되었습니다.' 
//   }
  









//   // findOne(id: string): Promise<UserEntity> {
//   //   return this.userRepository.findOne(id);
//   // }

//   // async remove(id: string): Promise<void> {
//   //   await this.userRepository.delete(id);
//   // }
// }


