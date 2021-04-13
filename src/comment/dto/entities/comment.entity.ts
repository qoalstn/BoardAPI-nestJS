import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { ContentEntity } from '../../../content/dto/entities/content.entity'
import { UserEntity } from "src/user/dto/entities/user.entity";

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

    @ManyToOne(type  => UserEntity, {cascade:true, onDelete: 'CASCADE'})
    @JoinColumn({
      name: 'mem_id',
      referencedColumnName: 'mem_id',    
    })
    user : UserEntity;

    // @ManyToOne(type  => ContentEntity, {cascade:true, onDelete: 'CASCADE'})
    // @JoinColumn({
    //   name: 'comment_id',
    //   referencedColumnName: 'comment_id',    
    // })
    // comment : ContentEntity;
  }








