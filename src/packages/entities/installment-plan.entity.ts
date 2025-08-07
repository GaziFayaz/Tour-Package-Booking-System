import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToOne,
  OneToMany,
  JoinColumn,
  Index
} from "typeorm";

@Entity('installment_plans')
@Index(['packageId', 'slotId'], { unique: true })
export class InstallmentPlan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    packageId: number;

    @Column()
    slotId: number;

    @Column({ type: 'int', unsigned: true, comment: 'Days from booking date for first installment' })
    firstInstallmentDays: number;

    @Column({ type: 'int', unsigned: true, comment: 'Days from booking date for second installment' })
    secondInstallmentDays: number;

    @Column({ type: 'int', unsigned: true, comment: 'Days from booking date for third installment' })
    thirdInstallmentDays: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relationships
    @OneToOne('PackageFare', 'installmentPlan', { onDelete: 'CASCADE' })
    @JoinColumn([
        { name: 'packageId', referencedColumnName: 'packageId' },
        { name: 'slotId', referencedColumnName: 'slotId' }
    ])
    fare: any;

    @OneToMany('AdultInstallmentValue', 'installmentPlan')
    adultValues: any[];

    @OneToMany('ChildInstallmentValue', 'installmentPlan')
    childValues: any[];

    @OneToMany('InfantInstallmentValue', 'installmentPlan')
    infantValues: any[];
}
