import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from '../../reports/entities/report.entity';
import { User } from '../../users/entities/user.entity';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  originalName: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column()
  url: string;

  @ManyToOne(() => Report, (report) => report.documents, { onDelete: 'CASCADE' })
  report: Report;

  @ManyToOne(() => User, { eager: true, nullable: true })
  uploadedBy: User;

  @CreateDateColumn()
  createdAt: Date;
}
