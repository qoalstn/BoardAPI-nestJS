import { Body, Controller, Get, Param, Patch, Post, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from '../user/dto/user.create';
import { UpdateUser } from '../user/dto/user.update';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LoginCredential } from 'src/auth/dto/login-credential.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAll() {
    return await this.userService.getAllUser();
  }

  //회원가입
  @Post('/new')
  async createUser(@Body() userData: CreateUser) {
    await this.userService.createUser(userData);
  }

  //정보수정
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async updateUser(@Param('id') id: number, @Body() userData: UpdateUser) {
    return await this.userService.updateUser(id, userData);
  }

  //내 게시글 조회
  @UseGuards(JwtAuthGuard)
  @Get('/content')
  async getUser_Content(@Req() req) {
    return await this.userService.getUser_Content(req.user.id);
  }

  //내 댓글 조회
  @UseGuards(JwtAuthGuard)
  @Get('comment')
  async getUser_Comment(@Req() req) {
    return await this.userService.getUser_Comment(req.user.id);
  }

  //회원 탈퇴
  @UseGuards(JwtAuthGuard)
  @Delete(':mem_id')
  async deleteUser(@Param('mem_id') mem_id: any, @Req() req) {
    return await this.userService.deleteUser(mem_id, req);
  }

  //팔로우
  @UseGuards(JwtAuthGuard)
  @Post('follow/:mem_id')
  async follow(@Param('mem_id') mem_id: number, @Req() req) {
    return await this.userService.follow(mem_id, req);
  }

  //언팔로우
  @UseGuards(JwtAuthGuard)
  @Delete('follow/:mem_id')
  async unfollow(@Param('mem_id') mem_id: number, @Req() req) {
    return await this.userService.unfollow(mem_id, req);
  }
}
