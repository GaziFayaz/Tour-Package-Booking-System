import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index
} from 'typeorm';

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
  @OneToOne('Booking', (booking: any) => booking.concernPerson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookingId' })
  booking: any;
}
