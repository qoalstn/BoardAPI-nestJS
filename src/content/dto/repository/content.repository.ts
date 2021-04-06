import { Repository } from "typeorm";
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { ContentEntity } from "../entities/content.entity";

@EntityRepository(ContentEntity)
export class ContentRepository extends Repository<ContentEntity>{} 