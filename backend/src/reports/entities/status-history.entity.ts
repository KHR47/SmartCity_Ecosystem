import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportStatus } from '../../common/enums/report-status.enum';
import { User } from '../../users/entities/user.entity';
import { Report } from './report.entity';

@Entity('status_history')
export class StatusHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ReportStatus,
  })
  status: ReportStatus;

  @Column({ nullable: true })
  notes?: string;

  @ManyToOne(() => Report, (report) => report.statusHistory, {
    onDelete: 'CASCADE',
  })
  report: Report;

  @ManyToOne(() => User, { eager: true, nullable: true })
  changedBy?: User;

  @CreateDateColumn()
  createdAt: Date;
}
