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

  @IsArray({ each: true })
  @IsString()
  @IsOptional()
  genres?: string[];
}
