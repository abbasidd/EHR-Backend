import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers : [UserService, JwtService]
})
export class UserModule {}
