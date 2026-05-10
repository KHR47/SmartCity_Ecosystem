import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ParkingSlot } from './parking-slot.entity';
import { Vehicle } from './vehicle.entity';

export enum BookingStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  OVERDUE = 'overdue',
}

export enum PaymentStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  REFUNDED = 'refunded',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @ManyToOne(() => ParkingSlot, (slot) => slot.bookings, { nullable: false })
  parkingSlot: ParkingSlot;

  @ManyToOne(() => Vehicle, { nullable: true })
  vehicle: Vehicle;

  @Column()
  vehicleNumber: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualCheckIn: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualCheckOut: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalFee: number;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.UNPAID })
  paymentStatus: PaymentStatus;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ nullable: true, type: 'text' })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
