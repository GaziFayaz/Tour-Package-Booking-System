import { Package, Slot } from 'src/packages/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export enum BookingStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
}

// Main Booking Entity
@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  packageId: number;

  @Column()
  slotId: number;

  @Column()
  concernPersonId: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.COMPLETED
  })
  status: BookingStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING
  })
  paymentStatus: PaymentStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  // total addon amount
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAddonAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ type: 'text', nullable: true })
  discountRemarks: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  paidAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  pendingAmount: number;

  @Column({ type: 'text', nullable: true })
  specialInstructions: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Package, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'packageId' })
  package: Package;

  @ManyToOne(() => Slot, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'slotId' })
  slot: Slot;

  @ManyToOne('BookingConcernPerson', (concernPerson: any) => concernPerson.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'concernPersonId' })
  concernPerson: any;

  @OneToMany('BookingPassenger', (passenger: any) => passenger.booking)
  passengers: any[];

  @OneToMany('BookingPayment', (payment: any) => payment.booking)
  payments: any[];
}
