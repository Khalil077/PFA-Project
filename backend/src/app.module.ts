import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv'


dotenv.config();
@Module({
  imports: [  TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.APP_HOST,
      port: Number(process.env.PORT), 
      username: process.env.APP_USERNAME,
      password: process.env.APP_PWD, 
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }), UsersModule ] ,
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
