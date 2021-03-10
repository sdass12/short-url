import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {ShortUrlModule} from "./short-url/short-url.module";

@Module({
  imports: [ShortUrlModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
