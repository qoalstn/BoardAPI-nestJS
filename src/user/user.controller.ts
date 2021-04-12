import { Body, Controller, Get, Param, Patch, Post, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from '../user/dto/user.create'
import { UpdateUser } from '../user/dto/user.update'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('/')
  async findAll() {
    return await this.userService.getAllUser();
  }

  @Get('/:id')
  async getUser(@Param('id') mem_id : number){
    return await this.userService.getUser(mem_id)
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

  @UseGuards(JwtAuthGuard) 
  @Delete('/:mem_id')
  async deleteUser(@Param('mem_id') mem_id: number) {
    // console.log(mem_id)
    return await this.userService.deleteUser(mem_id)
  }
}
