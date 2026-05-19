import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('gas_meters')
export class GasMeter {
  @PrimaryColumn()
  id: string;

  @Column()
  citizenName: string;

  @Column()
  zone: string;

  @Column()
  type: string;

  @Column({ default: 'pending' })
  status: string;

  @Column()
  address: string;

  @Column({ type: 'float', default: 0 })
  lastReading: number;

  @Column({ type: 'float', nullable: true })
  maxLimit?: number | null;

  @Column({ type: 'jsonb', default: [] })
  readings: { id: string; date: string; value: number; recordedBy: string }[];

  @Column({ type: 'jsonb', nullable: true })
  pendingInvoice: {
    id: string;
    date: string;
    amount: number;
    breakdown: any;
    status: string;
  } | null;

  @Column({ type: 'jsonb', default: [] })
  invoiceHistory: {
    id: string;
    date: string;
    amount: number;
    breakdown: any;
    status: string;
  }[];
}
