import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../_dto/entities/entity';

@Injectable()
export class  UserService {
  constructor(
    @InjectRepository(UserEntity)
    private commentRepository: Repository<UserEntity>,
  ) {}


  getAllUser(): Promise<UserEntity[]> {
    return this.commentRepository
    .createQueryBuilder()
    .getMany();
  }

  findOne(id: string): Promise<UserEntity> {
    return this.commentRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }
}




// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class UserService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }
