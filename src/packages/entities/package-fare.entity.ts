import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Package } from './package.entity';
import { Slot } from './slot.entity';
import { InstallmentPlan } from './installment-plan.entity';

@Entity('package_fares')
@Index(['packageId', 'slotId'], { unique: true }) // Composite unique index
export class PackageFare {
  @PrimaryColumn()
  packageId: number;

  @PrimaryColumn()
  slotId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
  adultFare: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
  childFare: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
  infantFare: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Package, (pkg) => pkg.fares, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'packageId' })
  package: Package;

  @ManyToOne(() => Slot, (slot) => slot.fares, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'slotId' })
  slot: Slot;

  @OneToOne(() => InstallmentPlan, (plan) => plan.fare)
  installmentPlan: InstallmentPlan;
}
