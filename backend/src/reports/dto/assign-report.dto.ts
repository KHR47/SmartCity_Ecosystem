import { IsInt } from 'class-validator';

export class AssignReportDto {
  @IsInt()
  officerId: number;
}
