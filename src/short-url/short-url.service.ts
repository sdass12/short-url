import { Injectable } from '@nestjs/common';
import {CreateUrlDto} from "./dto/CreateUrl.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {ShortUrlEntity} from "./entity/short-url.entity";
import {Repository} from "typeorm";

@Injectable()
export class ShortUrlService {
    constructor(
        @InjectRepository(ShortUrlEntity)
        private readonly shortUrlRepository: Repository<ShortUrlEntity>
    ) {}


    getAll() {
        return this.shortUrlRepository.find();
    }

    create(url : string) {
        let createDto: CreateUrlDto;
        createDto.url_real = url;
        createDto.url_short = "S";

        this.shortUrlRepository.create(createDto);

        return createDto.url_short;
    }
}
