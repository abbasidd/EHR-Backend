import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { IsActiveMiddleware } from './isActive.middleware';
import { CryptoService } from 'src/crypto/crypto.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
    // ,IsActiveMiddleware
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, CryptoService],
  exports: [UserService]
})
export class UserModule { }
