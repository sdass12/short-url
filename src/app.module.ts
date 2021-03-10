import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {ShortUrlModule} from "./short-url/short-url.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Connection} from "typeorm";

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

  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
    constructor(private readonly connection: Connection) {
    }
}
