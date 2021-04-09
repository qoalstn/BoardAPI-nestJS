import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { identity } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentService } from './comment.service';

@Controller('/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/send:id')
  async sendComment (@Body() body, @Param() id) {
    console.log(id)
    return await this.commentService.sendComment(body, id)
  }

}
