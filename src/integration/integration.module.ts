import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { BlockchainModule } from 'src/blockchain/blockchain.module';
import { IpfsService } from 'src/ipfs/ipfs.service';
@Module({
  imports: [TypeOrmModule.forFeature([User]
  ), BlockchainModule,
    UserModule,
    AuthModule],
  providers: [IntegrationService, UserService, JwtService, IpfsService, Repository<User>],
  controllers: [IntegrationController]
})
export class IntegrationModule { }
