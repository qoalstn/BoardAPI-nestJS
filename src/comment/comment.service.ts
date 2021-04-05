// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CommentEntity } from '../_dto/entities/entity';
// // import { CommentRepository } from '../_dao/--repository';

// @Injectable()
// export class CommentService {
//   constructor(
//     @InjectRepository(CommentEntity)
//     private commentRepository: Repository<CommentEntity>,
//   ) {}

// //   constructor(
// //     private readonly commentRepository : CommentRepository
// // ){}

//   findAll(): Promise<CommentEntity[]> {
//     return this.commentRepository.find();
//   }

//   findOne(id: string): Promise<CommentEntity> {
//     return this.commentRepository.findOne(id);
//   }

//   async remove(id: string): Promise<void> {
//     await this.commentRepository.delete(id);
//   }
// }