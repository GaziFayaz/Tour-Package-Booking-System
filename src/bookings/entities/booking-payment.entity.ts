import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum PaymentType {
  FULL_PAYMENT = 'full_payment',
  FIRST_INSTALLMENT = 'first_installment',
  SECOND_INSTALLMENT = 'second_installment',
  THIRD_INSTALLMENT = 'third_installment'
}

// Booking Payment Entity
@Entity('booking_payments')
export class BookingPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentType
  })
  paymentType: PaymentType; // if it is full payment or installment

  @Column({ length: 50 })
  paymentMethod: string;

  @Column({ length: 255, nullable: true })
  transactionId: string;

  @Column({ length: 50, default: 'pending' })
  status: string;

  @Column({ type: 'datetime', nullable: true })
  paidAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne('Booking', (booking: any) => booking.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookingId' })
  booking: any;
}
