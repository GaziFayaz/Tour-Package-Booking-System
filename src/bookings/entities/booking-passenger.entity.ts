import { AdultAddon, ChildAddon, InfantAddon } from 'src/packages/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Booking } from './booking.entity';

export enum PassengerType {
  ADULT = 'adult',
  CHILD = 'child',
  INFANT = 'infant',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
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
    enum: PassengerType,
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
    enum: Gender,
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
        referencedColumnName: 'id',
      },
    ],
    inverseJoinColumns: [
      {
        name: 'addonId',
        referencedColumnName: 'id',
      },
    ],
  })
  adultAddons: AdultAddon[];

  @ManyToMany(() => ChildAddon)
  @JoinTable({
    name: 'booking_passenger_child_addons',
    joinColumns: [
      {
        name: 'passengerId',
        referencedColumnName: 'id',
      },
    ],
    inverseJoinColumns: [
      {
        name: 'addonId',
        referencedColumnName: 'id',
      },
    ],
  })
  childAddons: ChildAddon[];

  @ManyToMany(() => InfantAddon)
  @JoinTable({
    name: 'booking_passenger_infant_addons',
    joinColumns: [
      {
        name: 'passengerId',
        referencedColumnName: 'id',
      },
    ],
    inverseJoinColumns: [
      {
        name: 'addonId',
        referencedColumnName: 'id',
      },
    ],
  })
  infantAddons: InfantAddon[];

  // Relationships
  @ManyToOne(() => Booking, (booking: Booking) => booking.passengers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;
}
