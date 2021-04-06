import { Repository } from "typeorm";
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { CommentEntity } from "../entities/comment.entity";

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity>{} 