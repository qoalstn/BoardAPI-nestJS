import { IsNotEmpty } from 'class-validator';

//content
export class CommentDto {

    mem_id : number;

    content_id : number;

    comment_text : string;

    comment_like : number;
}
