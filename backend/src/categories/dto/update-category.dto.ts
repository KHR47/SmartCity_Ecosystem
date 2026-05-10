import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CategoryType } from '../entities/category.entity';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(CategoryType)
  type?: CategoryType;

  @IsOptional()
  @IsString()
  description?: string | null;
}
