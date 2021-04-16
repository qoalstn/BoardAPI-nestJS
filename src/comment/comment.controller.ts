import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { identity } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('insert')
  async sendComment(@Body() body, @Req() req) {
    console.log(body);
    return await this.commentService.sendComment(body, req);
  }
}
