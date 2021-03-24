import {Controller, Get, Param, Res} from '@nestjs/common';
import {ShortUrlService} from "./short-url/short-url.service";

@Controller('')
export class AppController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Get()
  home(){
    return "Welcome to my ShortUrl API";
  }

  @Get('/:url')
  redirect(@Param('url') url : string, @Res() res){
      return this.shortUrlService.getRealUrl(url).then(result =>{
          return res.redirect(result.url_real);
      });
  }
}
