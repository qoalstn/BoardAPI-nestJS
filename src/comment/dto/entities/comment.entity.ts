import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

//comment
@Entity({name : 'nest_board_comment'})
  export class CommentEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('varchar', {unique : true, length:20, nullable:false})
    user_id : string;

    @Column('varchar', {unique : true, length:100, nullable:false})
    comment_text : string;

    @Column('varchar', {unique : true, length:20})
    comment_like : string;

    @CreateDateColumn()
    comment_regdate : Date;

    @UpdateDateColumn()
    comment_updatedate : Date;
  }








