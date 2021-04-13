import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToMany, JoinColumn, ManyToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ContentEntity } from "src/content/dto/entities/content.entity";
import { CommentEntity } from "src/comment/dto/entities/comment.entity";

@Entity({name : 'nest_board_user'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  mem_id : number;

  @Column('varchar', {unique : true, length:20, nullable:false})
  user_id : string;

  @Column('varchar', {length:100, nullable:false})
  user_pw : string;

  @Column('varchar', {unique : true, length:30, nullable:false})
  user_email : string;

  @CreateDateColumn()
  user_regdate : Date;

  
  @BeforeInsert()
  async hashPassword() {
      this.user_pw = await bcrypt.hash(this.user_pw, 10);
      console.log('UserEntity - user_pw'+this.user_pw)
  }

  @OneToMany((type) => ContentEntity, c => c.user, {onDelete: "CASCADE"})
  @JoinColumn({
    name:'mem_id',
    referencedColumnName:'mem_id'
  })
  contents: ContentEntity[];

  @OneToMany((type) => CommentEntity, c => c.user, {onDelete: "CASCADE"})
  @JoinColumn({
    name:'mem_id',
    referencedColumnName:'mem_id'
  })
  comments: CommentEntity[];
}





  // @OneToMany(() => ContentEntity, (i) => (i).user_id)
  // @JoinColumn({
  //   name: 'user_id',
  //   referencedColumnName: 'user_id',
  // })
  // photos: ContentEntity[]
