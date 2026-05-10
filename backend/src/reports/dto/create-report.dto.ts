import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { ReportType } from '../entities/report.entity';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ReportType)
  type: ReportType;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  divisionName?: string;

  @IsOptional()
  @IsString()
  districtName?: string;

  @IsOptional()
  @IsString()
  upazilaName?: string;

  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsBoolean()
  isAnonymous?: boolean;
}
