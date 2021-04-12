import { UserEntity } from "src/user/dto/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

//content
@Entity({ name: 'nest_board_content' })
export class ContentEntity {
  @PrimaryGeneratedColumn()
  content_id: number;

  @Column('int', {nullable: true})
  mem_id: number;

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

  @ManyToOne(type  => UserEntity, {cascade:true, onDelete: 'CASCADE'})
  @JoinColumn({
    name: 'mem_id',
    referencedColumnName: 'mem_id',
    
  })
  user : UserEntity;

}


  // @ManyToOne(() => UserEntity)
  // @JoinColumn({
  //   name: 'user_id',
  //   referencedColumnName: 'user_id',
  // })
  // option: UserEntity;