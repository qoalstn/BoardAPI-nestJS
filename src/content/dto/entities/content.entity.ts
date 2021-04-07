import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

//content
@Entity({name : 'nest_board_content'})
export class ContentEntity {
  @PrimaryGeneratedColumn()
  id : number;

  @Column('varchar', {unique : true, length:20, nullable:false})
  user_id : string;

  @Column('varchar', {nullable:true, length:200})
  content_img : string;

  @Column('varchar', {length:20})
  content_tag : string;

  @Column('varchar', {unique : true, length:200})
  content_text : string;

  @CreateDateColumn()
  comment_regdate : Date;

  @UpdateDateColumn()
  comment_updatedate : Date;
}