import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

//content
@Entity({ name: 'nest_board_content' })
export class ContentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', {nullable: true})
  user_id: number;

  @Column('varchar',  {nullable: true})
  content_img: string;

  @Column('varchar',  {nullable: true})
  content_tag: string;

  @Column('text',  {nullable: true})
  content_text: string;

  @CreateDateColumn()
  comment_regdate: Date;

  @UpdateDateColumn()
  comment_updatedate: Date;
}