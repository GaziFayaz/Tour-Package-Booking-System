import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Booking } from '../bookings/entities/booking.entity';
import { Role } from '../common/enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phone: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  photoUrl: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  photoPublicId: string | null; // Store Cloudinary public_id for deletion

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.ADMIN,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
