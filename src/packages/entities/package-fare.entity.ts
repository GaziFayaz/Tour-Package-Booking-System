import { 
  Column, 
  Entity, 
  PrimaryColumn,
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne, 
  OneToOne,
  JoinColumn,
  Index
} from "typeorm";

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
    @ManyToOne('Package', 'fares', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'packageId' })
    package: any;

    @ManyToOne('Slot', 'fares', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'slotId' })
    slot: any;

    @OneToOne('InstallmentPlan', 'fare')
    installmentPlan: any;
}
