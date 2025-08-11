import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Package } from './package.entity';
import { Slot } from './slot.entity';

@Entity('child_addons')
@Index(['packageId', 'slotId']) // Non-unique composite index for querying
export class ChildAddon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  packageId: number;

  @Column()
  slotId: number;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
  fare: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Package, (pkg) => pkg.childAddons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'packageId' })
  package: Package;

  @ManyToOne(() => Slot, (slot) => slot.childAddons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'slotId' })
  slot: Slot;
}
