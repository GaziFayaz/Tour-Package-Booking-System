import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index
} from 'typeorm';
import { Package, Slot, AdultAddon, ChildAddon, InfantAddon } from '../packages/packages.entity';

// Enum definitions
export enum PassengerType {
  ADULT = 'adult',
  CHILD = 'child',
  INFANT = 'infant'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export enum BookingStatus {
  COMPLETED = 'completed'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
}

export enum PaymentType {
  FULL_PAYMENT = 'full_payment',
  INSTALLMENT = 'installment'
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

  @OneToMany(() => BookingConcernPerson, (concernPerson) => concernPerson.booking)
  concernPersons: BookingConcernPerson[];

  @OneToMany(() => BookingPassenger, (passenger) => passenger.booking)
  passengers: BookingPassenger[];

  @OneToMany(() => BookingPayment, (payment) => payment.booking)
  payments: BookingPayment[];
}

// Booking Concern Person Entity
@Entity('booking_concern_persons')
export class BookingConcernPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingId: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 20, unique: true })
  phone: string;

  @Column({ type: 'text' })
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Booking, (booking) => booking.concernPersons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;
}

// Booking Passenger Entity
@Entity('booking_passengers')
export class BookingPassenger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingId: number;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({
    type: 'enum',
    enum: PassengerType
  })
  type: PassengerType;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: Gender
  })
  gender: Gender;

  @Column({ length: 50, nullable: true })
  passportNumber: string;

  @Column({ length: 255, nullable: true })
  passportScanUrl: string;

  @Column({ length: 10, nullable: true })
  tShirtSize: string;

  @Column({ type: 'text', nullable: true })
  foodRestrictions: string;

  @Column({ type: 'text', nullable: true })
  specialInstructions: string;

  @Column({ type: 'text', nullable: true })
  sicknessInformation: string;

  @Column({ length: 255, nullable: true })
  pickupPoint: string;

  // Addon foreign key columns (nullable)
  @Column({ nullable: true })
  adultAddonPackageId: number;

  @Column({ nullable: true })
  adultAddonSlotId: number;

  @Column({ nullable: true })
  childAddonPackageId: number;

  @Column({ nullable: true })
  childAddonSlotId: number;

  @Column({ nullable: true })
  infantAddonPackageId: number;

  @Column({ nullable: true })
  infantAddonSlotId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Booking, (booking) => booking.passengers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;

  // Addon relationships (all nullable)
  @ManyToOne(() => AdultAddon, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn([
    { name: 'adultAddonPackageId', referencedColumnName: 'packageId' },
    { name: 'adultAddonSlotId', referencedColumnName: 'slotId' }
  ])
  adultAddon?: AdultAddon;

  @ManyToOne(() => ChildAddon, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn([
    { name: 'childAddonPackageId', referencedColumnName: 'packageId' },
    { name: 'childAddonSlotId', referencedColumnName: 'slotId' }
  ])
  childAddon?: ChildAddon;

  @ManyToOne(() => InfantAddon, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn([
    { name: 'infantAddonPackageId', referencedColumnName: 'packageId' },
    { name: 'infantAddonSlotId', referencedColumnName: 'slotId' }
  ])
  infantAddon?: InfantAddon;
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
  @ManyToOne(() => Booking, (booking) => booking.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;
}
