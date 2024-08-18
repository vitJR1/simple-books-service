import { IsArray, IsDateString, IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  author: string;

  @IsDateString()
  publicationDate: string;

  @IsArray()
  @IsString({ each: true })
  genres: string[];
}
