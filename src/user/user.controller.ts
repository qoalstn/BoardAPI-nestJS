import { Body, Controller, Get, Param, Patch, Post, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from '../user/dto/user.create'
import { UpdateUser } from '../user/dto/user.update'
import { get, request } from 'node:http';
import { timeStamp } from 'node:console';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }


  @Get('/')
  async findAll() {
    return await this.userService.getAllUser();
  }

  @Get('/:user_id')
  async getUser(@Param('user_id') user_id : string){
    return await this.userService.getUser(user_id)
  }

  @Post('/new')
  async createUser(@Body() userData: CreateUser) {
    await this.userService.createUser(userData)
  }

  @Patch('update/:id')
  async updateUser(@Param('id') id : number, @Body() userData: UpdateUser){
    return await this.userService.updateUser(id, userData);
  }

  @Delete('/delete/:user_id')
  async deleteUser(@Param('user_id') user_id: string) {
    return await this.userService.deleteUser(user_id)
  }
}
