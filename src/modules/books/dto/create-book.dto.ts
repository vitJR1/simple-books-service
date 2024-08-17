import { IsArray, IsDate, IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  author: string;

  @IsDate()
  publicationDate: string;

  @IsArray({ each: true })
  @IsString()
  genres: string[];
}
