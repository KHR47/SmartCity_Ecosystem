import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { District } from './district.entity';
import { Thana } from './thana.entity';

@Entity('upazilas')
export class Upazila {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => District, (district) => district.upazilas, {
    onDelete: 'CASCADE',
  })
  district: District;

  @OneToMany(() => Thana, (thana) => thana.upazila)
  thanas: Thana[];
}
