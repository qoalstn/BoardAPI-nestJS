import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Param,
  HttpStatus,
  UseGuards,
  Body,
  Req,
  Delete,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/utils/guard';
import { editFileName, imageFilter } from '../utils/file_upload';
import { ContentService } from './content.service';
import { ContentDto } from './dto/content.dto';
// import { editFileName, imageFilter } from '../utils/file_upload';

@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getContents() {
    const data = await this.contentService.getContent();
    return data;
  }

  // 게시글 업로드
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('insert')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFilter,
    }),
  )
  async uploadedFile(@Body() body: ContentDto, @Req() req, @UploadedFile() file) {
    console.log(req.user.id);
    const data = await this.contentService.uploadFile(body, file, req.user['user_id']);
    return data;
  }

  //게시글 수정
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('update/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFilter,
    }),
  )
  async updateContent(@Param('id') id: number, @Body() body: ContentDto, @UploadedFile() file) {
    const data = await this.contentService.updateContent(id, body, file);
    return data;
  }

  @Get('comment/:content_id')
  async getContent_comment(@Param('content_id') content_id: number) {
    return this.contentService.getContent_comment(content_id);
  }

  //좋아요
  @UseGuards(JwtAuthGuard)
  @Post('like/:conetent_id')
  async clickLike(@Param('conetent_id') conetent_id: number, @Req() req) {
    await this.contentService.clickLike(conetent_id, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:content_id')
  async deleteContent(@Param('content_id') content_id, @Req() req) {
    console.log(req.user.id);
    return await this.deleteContent(content_id, req.user.id);
  }

  @Get('user/:content_id')
  async getImage(@Param('content_id') content_id: any, @Req() Req) {
    // console.log(content_id)
    return await this.contentService.findAll();
  }
}
