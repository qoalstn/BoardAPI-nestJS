// import {
//   Controller,
//   Get,
//   Post,
//   UseInterceptors,
//   UploadedFile,
//   UploadedFiles,
//   Res,
//   Param,
// } from '@nestjs/common';
// import { ContentService } from './content.service';
// import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
// import { ContentRepository } from './dto/repository/content.repository';

// @Controller('/content')
// export class ContentController {
//   constructor(
//     private readonly contentRepository : ContentRepository,
// ){}

//   @Post()
//   @UseInterceptors(
//     FileInterceptor('image', {
//       storage: diskStorage({
//         destination: './files',
//         filename: editFileName,
//       }),
//       fileFilter: imageFileFilter,
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
//       fileFilter: imageFileFilter,
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


import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ContentService } from './content.service';
import { ContentEntity } from './dto/entities/content.entity';

@Controller('/content')
export class ContentController {
  constructor(private readonly appService: ContentService) {}

  // @Get()
  // sayHello() {
  //   return this.appService.getHello();
  // }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(
    @Body() body: ContentEntity,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
}