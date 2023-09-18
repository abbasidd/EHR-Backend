import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { IntegrationModule } from './integration/integration.module';
import { FileModule } from './fileUpload/file.module';
import { Files } from './fileUpload/entity/file.entity';
import { BlockchainModule } from './blockchain/blockchain.module';
import { EncryptionService } from './encryption/encryption.service';
import { CryptoService } from './crypto/crypto.service';
import { IpfsService } from './ipfs/ipfs.service';
import { UploadController } from './ipfs/ipfs.controller';
import configurations from './config/config.service'
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      port: 5432,
      password: 'my',
      database: 'health_record',
      entities: [User, Files],
      synchronize: true,

    }),
    FileModule,
    UserModule,
    AuthModule,
    PassportModule,
    IntegrationModule,
    BlockchainModule,
    ConfigModule,
    // ConfigModule_
  ],
  controllers: [UploadController],
  providers: [EncryptionService, CryptoService, IpfsService],
})
export class AppModule { }
