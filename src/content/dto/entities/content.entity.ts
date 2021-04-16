import { CommentEntity } from 'src/comment/dto/entities/comment.entity';
import { UserEntity } from 'src/user/dto/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  Like,
  BaseEntity,
} from 'typeorm';

//content
@Entity({ name: 'nest_board_content' })
export class ContentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  content_id: number;

  @Column('int')
  mem_id: number;

  @Column('varchar')
  content_img: string;

  @Column('varchar')
  content_tag: string;

  @Column('text')
  content_text: string;

  @CreateDateColumn()
  comment_regdate: Date;

  @UpdateDateColumn()
  comment_updatedate: Date;

  @ManyToOne((type) => UserEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'mem_id',
    referencedColumnName: 'mem_id',
  })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (c) => c.comments)
  @JoinColumn({
    name: 'content_id',
    referencedColumnName: 'comment_id',
  })
  content: CommentEntity[];

  @ManyToMany(() => UserEntity, { cascade: true })
  @JoinTable({
    name: 'content_like',
    joinColumns: [
      {
        name: 'content_id',
        referencedColumnName: 'content_id',
      },
    ],
    inverseJoinColumns: [
      {
        name: 'mem_id',
        referencedColumnName: 'mem_id',
      },
    ],
  })
  users: UserEntity[];
}

// @ManyToOne(() => UserEntity)
// @JoinColumn({
//   name: 'user_id',
//   referencedColumnName: 'user_id',
// })
// option: UserEntity;
