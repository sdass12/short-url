import {Injectable} from '@nestjs/common';
import {CreateUrlDto} from "./dto/CreateUrl.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {ShortUrlEntity} from "./entity/short-url.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';

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
        //TODO : 해싱 후 해싱 전 URL과 해싱 후 URL을 각각 DB에 저장하고 반환
        function changeUrl(url) {
            let changeUrl = "http://localhost:3000/";
            var hash = 0, i, chr;
            if (url.length === 0) return hash;
            for (i = 0; i < url.length; i++) {
                chr = url.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                //hash |= 0; // Convert to 32bit integer
            }
            changeUrl += hash.toString(16);

            return changeUrl;
        };

        const saveUrl = async () => {
            const changedUrl = changeUrl(url)

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
