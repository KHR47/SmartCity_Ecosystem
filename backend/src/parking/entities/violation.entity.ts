import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ParkingLot } from './parking-lot.entity';
import { Booking } from './booking.entity';

export enum ViolationStatus {
  ISSUED = 'issued',
  PAID = 'paid',
  DISPUTED = 'disputed',
  RESOLVED = 'resolved',
  WAIVED = 'waived',
}

export enum ViolationType {
  OVERSTAY = 'overstay',
  NO_TICKET = 'no_ticket',
  WRONG_SLOT = 'wrong_slot',
  UNAUTHORIZED = 'unauthorized',
  OTHER = 'other',
}

@Entity('violations')
export class Violation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => User, { nullable: true })
  issuedBy: User;

  @ManyToOne(() => ParkingLot, { nullable: true })
  parkingLot: ParkingLot;

  @ManyToOne(() => Booking, { nullable: true })
  booking: Booking;

  @Column()
  vehicleNumber: string;

  @Column()
  reason: string;

  @Column({ type: 'enum', enum: ViolationType, default: ViolationType.OTHER })
  violationType: ViolationType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  fineAmount: number;

  @Column({ type: 'enum', enum: ViolationStatus, default: ViolationStatus.ISSUED })
  status: ViolationStatus;

  @Column({ nullable: true, type: 'text' })
  resolutionNotes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
