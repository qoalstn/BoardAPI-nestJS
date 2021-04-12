import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { ContentEntity } from '../../../content/dto/entities/content.entity'

//comment
@Entity({name : 'nest_board_comment'})
  export class CommentEntity {
    @PrimaryGeneratedColumn()
    comment_id : number;

    @Column('int', {nullable:false})
    mem_id : number;

    @Column('int', { nullable:false})
    content_id : number;

    @Column('varchar', {length:100, nullable:false})
    comment_text : string;

    @Column('int')
    comment_like : number;

    @CreateDateColumn()
    comment_regdate : Date;

    @UpdateDateColumn()
    comment_updatedate : Date;

 
  }








