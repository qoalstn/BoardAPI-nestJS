import { Controller, Get, Post,UseInterceptors, UploadedFile, UploadedFiles, Res, Param, HttpStatus, UseGuards, Body, Req } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/utils/guard';
import { editFileName, imageFilter } from '../utils/file_upload';
import { ContentService } from './content.service';
import { ContentDto } from './dto/content.dto';
// import { editFileName, imageFilter } from '../utils/file_upload';

@Controller('files')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // upload single file
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/',
        filename: editFileName,
      }),
      fileFilter: imageFilter,
    }),
  )
  async uploadedFile(@Body() body:ContentDto, @Req() req, @UploadedFile() file) {
    console.log(req);
    const data = await this.contentService.uploadFile(body, file);
    return data;
  }

  @Post('uploadMultipleFiles')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
    };
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