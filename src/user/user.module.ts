import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './dto/repository/user.repository';
import { UserEntity } from './dto/entities/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
