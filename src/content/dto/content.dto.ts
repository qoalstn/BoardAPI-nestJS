import { IsNotEmpty } from 'class-validator';

//content
export class ContentDto {
  content_id : number

  content_tag : string;

  content_text : string;

  content_like : boolean;
}