import { IsNotEmpty } from 'class-validator';

//content
export class ContentDto {
    
  @IsNotEmpty()
  content_img : object;

  content_tag : string;

  content_text : string;

  comment_regdate : Date;

  comment_updatedate : Date;
}