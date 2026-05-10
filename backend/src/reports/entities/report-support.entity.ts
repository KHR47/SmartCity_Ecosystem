import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Report } from './report.entity';

@Entity()
export class ReportSupport {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Report, (report) => report.supports, { onDelete: 'CASCADE' })
  report: Report;

  @CreateDateColumn()
  createdAt: Date;
}
