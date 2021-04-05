// import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateUser } from '../user/dto/user.create'
// import { UpdateUser } from '../user/dto/user.update'
// import { get, request } from 'node:http';
// import { timeStamp } from 'node:console';

// @Controller('/user')
// export class AuthController {
//   constructor(private readonly userService: AuthService) {}

//   // @Get()
//   // getHello(): string {
//   //   return this.appService.getHello();
//   // }


//   @Get('/:user_id')
//   async getUser(@Param('user_id') user_id : string){
//     return await this.userService.getUser(user_id)
//   }

//   @Post('/new')
//   async createUser(@Body() userData: CreateUser) {
//     await this.userService.createUser(userData)
//   }

//   @Patch('update/:id')
//   async updateUser(@Param('id') id : number, @Body() userData: UpdateUser){
//     return await this.userService.updateUser(id, userData);
//   }

//   @Delete('/delete/:user_id')
//   async deleteUser(@Param('user_id') user_id: string) {
//     return await this.userService.deleteUser(user_id)
//   }
// }
