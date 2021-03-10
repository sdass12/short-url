import {IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateUrlDto {
    @IsString()
    readonly url: string;
}