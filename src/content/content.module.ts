import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ContentRepository } from './dto/repository/content.repository';


@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository])
],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
