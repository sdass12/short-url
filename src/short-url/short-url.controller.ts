import {Body, Controller, Get, Post, Render, Req} from '@nestjs/common';
import {ShortUrlService} from "./short-url.service";
import {CreateUrlDto} from "./dto/CreateUrl.dto";

@Controller('short-url')
export class ShortUrlController {
    constructor(private readonly shortUrlService: ShortUrlService) {}

    @Get()
    @Render('index')
    root() {
        return { message: "Hello. This is ShortUrlApi"};
    }

    @Post('createShortUrl')
    @Render('index')
    create(@Body() req) {
        return this.shortUrlService.create(req.url).then(result => {
            return {changeUrl : result, originalUrl : req.url}
        });
    }

    @Get('list')
    @Render('list')
    async getAll() {
        const ret = await this.shortUrlService.getAll()
        return {urlList: ret}
    }
}
