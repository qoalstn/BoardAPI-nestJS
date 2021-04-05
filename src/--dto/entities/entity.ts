// import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

// //user
// @Entity({name : 'nest_board_user'})
// export class UserEntity {
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


// //content
// @Entity({name : 'nest_board_content'})
// export class ContentEntity {
//   @PrimaryGeneratedColumn()
//   id : number;

//   @Column('mediumblob', {nullable:false})
//   content_img : object;

//   @Column('varchar', {length:20})
//   content_tag : string;

//   @Column('varchar', {unique : true, length:200})
//   content_text : string;

//   @CreateDateColumn()
//   comment_regdate : Date;

//   @UpdateDateColumn()
//   comment_updatedate : Date;
// }


// //comment
// @Entity({name : 'nest_board_comment'})
//   export class CommentEntity {
//     @PrimaryGeneratedColumn()
//     id : number;

//     @Column('varchar', {unique : true, length:100, nullable:false})
//     comment_text : string;

//     @Column('varchar', {unique : true, length:20})
//     comment_like : string;

//     @CreateDateColumn()
//     comment_regdate : Date;

//     @UpdateDateColumn()
//     comment_updatedate : Date;
//   }








