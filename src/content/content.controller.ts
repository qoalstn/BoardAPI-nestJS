import { Controller, Get, Post,UseInterceptors, UploadedFile, UploadedFiles, Res, Param, HttpStatus, UseGuards, Body, Req } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthGuard } from 'src/utils/guard';
import { editFileName, imageFilter } from '../utils/file_upload';
import { ContentService } from './content.service';
import { ContentDto } from './dto/content.dto';
// import { editFileName, imageFilter } from '../utils/file_upload';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}


  @Get()
  // @UseGuards(JwtAuthGuard) 
  async getContents () {
    const comment = await this.contentService.getComment()
    const content = await this.contentService.getContent()
    console.log(comment,content)
  }

  // upload single file
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
  async uploadedFile(@Body() body:ContentDto, @Req() req, @UploadedFile() file) {
    console.log(req.user);
    const data = await this.contentService.uploadFile(body, file, req.user['user_id']);
    return data;
  }



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
  async updateContent(@Param('id') id : number, @Body() body:ContentDto, @UploadedFile() file) {
    const data = await this.contentService.updateContent(id, body, file);
    return data;
  }




  @Get(':imagename')
  getImage(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}











// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   UseInterceptors,
//   UploadedFile,
//   UploadedFiles,
//   Res,
//   Param,
// } from '@nestjs/common';
// import { ContentService } from './content.service';
// import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { editFileName, imageFilter } from '../utils/file_upload';
// import { ContentRepository } from './dto/repository/content.repository';

// @Controller('/content')
// export class ContentController {
//   constructor(
//     private readonly contentRepository : ContentRepository,
// ){}

//   @Post()
//   @Body 
//   @UseInterceptors(
//     FileInterceptor('image', {
//       storage: diskStorage({
//         destination: './files',
//         filename: editFileName,
//       }),
//       fileFilter: imageFilter,
//     }),
//   )
//   async uploadedFile(@UploadedFile() file) {
//     const response = {
//       originalname: file.originalname,
//       filename: file.filename,
//     };
//     return response;
//   }

//   @Post('multiple')
//   @UseInterceptors(
//     FilesInterceptor('image', 20, {
//       storage: diskStorage({
//         destination: './files',
//         filename: editFileName,
//       }),
//       fileFilter: imageFilter,
//     }),
//   )
//   async uploadMultipleFiles(@UploadedFiles() files) {
//     const response = [];
//     files.forEach(file => {
//       const fileReponse = {
//         originalname: file.originalname,
//         filename: file.filename,
//       };
//       response.push(fileReponse);
//     });
//     return response;
//   }

//   @Get(':imgpath')
//   seeUploadedFile(@Param('imgpath') image, @Res() res) {
//     return res.sendFile(image, { root: './files' });
//   }
// }


// import {
//   Body,
//   Controller,
//   Get,
//   Post,
//   UploadedFile,
//   UseInterceptors,
//   UploadedFiles
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { Express } from 'express';
// import { ContentService } from './content.service';
// import { ContentEntity } from './dto/entities/content.entity';

// @Controller('/content')
// export class ContentController {
//   constructor(private readonly appService: ContentService) {}

//   // @Get()
//   // sayHello() {
//   //   return this.appService.getHello();
//   // }

//   @UseInterceptors(FileInterceptor('file'))
//   @Post('file')
//   uploadFile(
//     @Body() body: ContentEntity,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     return {
//       body,
//       file: file.buffer.toString(),
//     };
//   }
// }
