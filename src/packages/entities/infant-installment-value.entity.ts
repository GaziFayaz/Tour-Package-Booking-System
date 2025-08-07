import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne,
  JoinColumn
} from "typeorm";

@Entity('infant_installment_values')
export class InfantInstallmentValue {
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
    @ManyToOne('InstallmentPlan', 'infantValues', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'installmentPlanId' })
    installmentPlan: any;
}
