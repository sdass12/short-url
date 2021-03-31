import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ShortUrlEntity {
    @PrimaryGeneratedColumn()
    urlIdx: number;

    @Column({unique: true, length: 255})
    url_real: string;

    @Column({unique: true, length: 50})
    url_short: string;
}