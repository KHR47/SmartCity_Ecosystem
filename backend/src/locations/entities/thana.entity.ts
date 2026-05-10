import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Upazila } from './upazila.entity';

@Entity('thanas')
export class Thana {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Upazila, (upazila) => upazila.thanas, {
    onDelete: 'CASCADE',
  })
  upazila: Upazila;
}
