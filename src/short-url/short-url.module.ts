import {ShortUrlService} from "./short-url.service";
import {ShortUrlController} from "./short-url.controller";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ShortUrlEntity} from "./entity/short-url.entity";


@Module({
    imports: [TypeOrmModule.forFeature([ShortUrlEntity])],
    controllers: [ShortUrlController],
    providers: [ShortUrlService]
})
export class ShortUrlModule {}