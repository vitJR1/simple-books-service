import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsDate()
  @IsOptional()
  publicationDate?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  genres?: string[];
}
