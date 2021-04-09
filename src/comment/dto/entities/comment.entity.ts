import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

//comment
@Entity({name : 'nest_board_comment'})
  export class CommentEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('int', {nullable:false})
    user_id : number;

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

  //   @OneToMany(type => Photo, photo => photo.user)
  //   photos: Photo[]
  // }
  }








