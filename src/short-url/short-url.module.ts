import {ShortUrlService} from "./short-url.service";
import {ShortUrlController} from "./short-url.controller";

// @ts-ignore
@module({
    controllers: [ShortUrlController],
    providers: [ShortUrlService]
})
export class ShortUrlModule {}