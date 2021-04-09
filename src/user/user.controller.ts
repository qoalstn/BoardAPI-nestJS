import { Body, Controller, Get, Param, Patch, Post, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from '../user/dto/user.create'
import { UpdateUser } from '../user/dto/user.update'
import { get, request } from 'node:http';
import { timeStamp } from 'node:console';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('/')
  async findAll() {
    return await this.userService.getAllUser();
  }

  @Get('/:id')
  async getUser(@Param('id') id : string){
    return await this.userService.findOne(id)
  }

  @Post('/new')
  async createUser(@Body() userData: CreateUser) {
    await this.userService.createUser(userData)
  }

  @Patch('update/:id')
  async updateUser(@Param('id') id : number, @Body() userData: UpdateUser){
    // console.log("deleteUser - controller")
    return await this.userService.updateUser(id, userData);
  }

  @Delete('/delete/:id')
  async deleteUser(@Param() id: number) {
    console.log("deleteUser - controller")
    return await this.userService.deleteUser(id)
  }
}
