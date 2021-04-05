// import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

// @Entity({name : 'nest_board_user'})
// export class AuthEntity {
//   @PrimaryGeneratedColumn()
//   id : number;

//   @Column('varchar', {unique : true, length:20, nullable:false})
//   user_id : string;

//   @Column('varchar', {length:20, nullable:false})
//   user_pw : string;

//   @Column('varchar', {unique : true, length:30, nullable:false})
//   user_email : string;

//   @CreateDateColumn()
//   user_regdate : Date;
// }