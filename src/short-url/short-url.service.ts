import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ShortUrlEntity} from "./entity/short-url.entity";
import {Repository} from "typeorm";

@Injectable()
export class ShortUrlService {
    constructor(
        @InjectRepository(ShortUrlEntity)
        private readonly shortUrlRepository: Repository<ShortUrlEntity>
    ) {}


    getRealUrl(url: string) {
        return this.shortUrlRepository.findOne({url_short:url});
    }

    getAll() {
        return this.shortUrlRepository.find();
    }

     create(url: string) {
        const shortUrl = require('node-url-shortener');

        const saveUrl = async () => {
             let getChangedUrl = new Promise(((resolve, reject) => {
                shortUrl.short(url, function(err, shortenerUrl){
                     resolve(shortenerUrl.replace(/https:\/\/.*\//g,''));
                });
            }))

            const isThereRow = await this.shortUrlRepository.findOne({url_real: url})
            if (isThereRow == undefined) {
                // @ts-ignore
                await this.shortUrlRepository.save({
                    url_real: url,
                    url_short: await getChangedUrl
                })
            }

            return "http://localhost:3000//"+await getChangedUrl;
        }

        return saveUrl();
    }
}
