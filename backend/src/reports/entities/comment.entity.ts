import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Report } from './report.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => Report, (report) => report.comments, { onDelete: 'CASCADE' })
  report: Report;

  @ManyToOne(() => User, { eager: true })
  author: User;

  @CreateDateColumn()
  createdAt: Date;
}
