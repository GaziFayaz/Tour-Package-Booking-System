import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { InstallmentPlan } from './installment-plan.entity';

@Entity('child_installment_values')
export class ChildInstallmentValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  installmentPlanId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
  firstInstallmentAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
  secondInstallmentAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
  thirdInstallmentAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => InstallmentPlan, (plan) => plan.childValues, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'installmentPlanId' })
  installmentPlan: InstallmentPlan;
}
