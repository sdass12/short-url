import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {join} from 'path'
import {NestExpressApplication} from "@nestjs/platform-express";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
    );

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // validation을 위한 decorator가 붙어있지 않은 속성들은 제거
        forbidNonWhitelisted: true, // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400 에러)
        transform: true, // 요청에서 넘어온 자료들의 형변환
    }));
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs')

    await app.listen(process.env.PORT || 3000);
}


bootstrap();
