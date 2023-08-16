import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TyprOrmModule} from '@ne'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,

    })
    TypeOrmModule.forRoot({

    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}