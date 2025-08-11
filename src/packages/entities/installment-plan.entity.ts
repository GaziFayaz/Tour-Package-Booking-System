import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { PackageFare } from './package-fare.entity';
import { AdultInstallmentValue } from './adult-installment-value.entity';
import { ChildInstallmentValue } from './child-installment-value.entity';
import { InfantInstallmentValue } from './infant-installment-value.entity';

@Entity('installment_plans')
@Index(['packageId', 'slotId'], { unique: true })
export class InstallmentPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  packageId: number;

  @Column()
  slotId: number;

  @Column({
    type: 'int',
    unsigned: true,
    comment: 'Days from booking date for first installment',
  })
  firstInstallmentDays: number;

  @Column({
    type: 'int',
    unsigned: true,
    comment: 'Days from booking date for second installment',
  })
  secondInstallmentDays: number;

  @Column({
    type: 'int',
    unsigned: true,
    comment: 'Days from booking date for third installment',
  })
  thirdInstallmentDays: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToOne(() => PackageFare, (fare) => fare.installmentPlan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    { name: 'packageId', referencedColumnName: 'packageId' },
    { name: 'slotId', referencedColumnName: 'slotId' },
  ])
  fare: PackageFare;

  @OneToMany(() => AdultInstallmentValue, (value) => value.installmentPlan)
  adultValues: AdultInstallmentValue[];

  @OneToMany(() => ChildInstallmentValue, (value) => value.installmentPlan)
  childValues: ChildInstallmentValue[];

  @OneToMany(() => InfantInstallmentValue, (value) => value.installmentPlan)
  infantValues: InfantInstallmentValue[];
}
