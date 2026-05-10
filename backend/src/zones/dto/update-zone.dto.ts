import { IsOptional, IsString } from 'class-validator';

export class UpdateZoneDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  areaDescription?: string;
}
