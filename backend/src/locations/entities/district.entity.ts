import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Division } from './division.entity';
import { Upazila } from './upazila.entity';

@Entity('districts')
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Division, (division) => division.districts, {
    onDelete: 'CASCADE',
  })
  division: Division;

  @OneToMany(() => Upazila, (upazila) => upazila.district)
  upazilas: Upazila[];
}
