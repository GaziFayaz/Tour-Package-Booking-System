import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
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
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
}

export enum PaymentType {
  FULL_PAYMENT = 'full_payment',
  FIRST_INSTALLMENT = 'first_installment',
  SECOND_INSTALLMENT = 'second_installment',
  THIRD_INSTALLMENT = 'third_installment'
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

  @OneToOne(() => BookingConcernPerson, (concernPerson) => concernPerson.booking)
  concernPerson: BookingConcernPerson;

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
  @Index({ unique: true })
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
  @OneToOne(() => Booking, (booking) => booking.concernPerson, { onDelete: 'CASCADE' })
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Many-to-many relationships with addon entities
  @ManyToMany(() => AdultAddon)
  @JoinTable({
    name: 'booking_passenger_adult_addons',
    joinColumns: [
      {
        name: 'passengerId',
        referencedColumnName: 'id'
      }
    ],
    inverseJoinColumns: [
      {
        name: 'addonPackageId',
        referencedColumnName: 'packageId'
      },
      {
        name: 'addonSlotId',
        referencedColumnName: 'slotId'
      }
    ]
  })
  adultAddons: AdultAddon[];

  @ManyToMany(() => ChildAddon)
  @JoinTable({
    name: 'booking_passenger_child_addons',
    joinColumns: [
      {
        name: 'passengerId',
        referencedColumnName: 'id'
      }
    ],
    inverseJoinColumns: [
      {
        name: 'addonPackageId',
        referencedColumnName: 'packageId'
      },
      {
        name: 'addonSlotId',
        referencedColumnName: 'slotId'
      }
    ]
  })
  childAddons: ChildAddon[];

  @ManyToMany(() => InfantAddon)
  @JoinTable({
    name: 'booking_passenger_infant_addons',
    joinColumns: [
      {
        name: 'passengerId',
        referencedColumnName: 'id'
      }
    ],
    inverseJoinColumns: [
      {
        name: 'addonPackageId',
        referencedColumnName: 'packageId'
      },
      {
        name: 'addonSlotId',
        referencedColumnName: 'slotId'
      }
    ]
  })
  infantAddons: InfantAddon[];

  // Relationships
  @ManyToOne(() => Booking, (booking) => booking.passengers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;
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
