import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {ShortUrlModule} from "./short-url/short-url.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {ShortUrlService} from "./short-url/short-url.service";
import {ShortUrlEntity} from "./short-url/entity/short-url.entity";

@Module({
  imports: [
      ShortUrlModule,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'short-url',
        entities: [__dirname+'/**/*.entity{.rs,.js}'],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([ShortUrlEntity])
  ],
  controllers: [AppController],
  providers: [ShortUrlService],

})
export class AppModule {
    constructor(private readonly connection: Connection) {
    }
}
