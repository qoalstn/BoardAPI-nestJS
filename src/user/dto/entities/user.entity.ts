import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({name : 'nest_board_user'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id : number;

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

}