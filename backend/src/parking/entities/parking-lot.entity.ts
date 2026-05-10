import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ParkingSlot } from './parking-slot.entity';
import { User } from '../../users/entities/user.entity';

@Entity('parking_lots')
export class ParkingLot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ default: 0 })
  totalSlots: number;

  @Column({ default: 0 })
  availableSlots: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  hourlyRate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  peakRate: number;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  operatorId: number;

  @Column({ nullable: true })
  floors: number;

  @Column({ nullable: true })
  zones: string;

  @Column({ nullable: true })
  openTime: string;

  @Column({ nullable: true })
  closeTime: string;

  @OneToMany(() => ParkingSlot, (slot) => slot.parkingLot, { cascade: true })
  slots: ParkingSlot[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
