import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ShortUrlEntity} from "./entity/short-url.entity";
import {Repository} from "typeorm";

@Injectable()
export class ShortUrlService {
    constructor(
        @InjectRepository(ShortUrlEntity)
        private readonly shortUrlRepository: Repository<ShortUrlEntity>
    ) {
    }


    getRealUrl(url: string) {
        return this.shortUrlRepository.findOne({url_short:url});
    }

    getAll() {
        return this.shortUrlRepository.find();
    }

    create(url: string) {
        function changeUrl(url) {
            let changeUrl = "http://localhost:3000/";
            var hash = 0, i, chr;
            if (url.length === 0) return hash;
            for (i = 0; i < url.length; i++) {
                chr = url.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            changeUrl += hash.toString(16);

            return changeUrl;
        };

        const shortUrl = require('node-url-shortener');

        const saveUrl = async () => {
            const changedUrl = shortUrl.short(url, function(err, url){return url;});

            const isThereRow = await this.shortUrlRepository.findOne({url_real: url})
            if (isThereRow == undefined) {
                // @ts-ignore
                await this.shortUrlRepository.save({
                    url_real: url,
                    url_short: changedUrl
                })
            }
            return changedUrl
        }

        return saveUrl();
    }
}
