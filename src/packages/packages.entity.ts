import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne, 
  OneToMany, 
  JoinColumn,
  PrimaryColumn,
  Index
} from "typeorm";

@Entity('packages')
export class Package {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relationships
    @OneToMany(() => PackageFare, (fare) => fare.package)
    fares: PackageFare[];

    @OneToMany(() => AdultInstallment, (installment) => installment.package)
    adultInstallments: AdultInstallment[];

    @OneToMany(() => ChildInstallment, (installment) => installment.package)
    childInstallments: ChildInstallment[];

    @OneToMany(() => InfantInstallment, (installment) => installment.package)
    infantInstallments: InfantInstallment[];

    @OneToMany(() => AdultAddon, (addon) => addon.package)
    adultAddons: AdultAddon[];

    @OneToMany(() => ChildAddon, (addon) => addon.package)
    childAddons: ChildAddon[];

    @OneToMany(() => InfantAddon, (addon) => addon.package)
    infantAddons: InfantAddon[];
}

@Entity('slots')
export class Slot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'int', unsigned: true })
    seatCount: number;

    @Column({ type: 'datetime' })
    startDate: Date;

    @Column({ type: 'datetime' })
    endDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relationships
    @OneToMany(() => PackageFare, (fare) => fare.slot)
    fares: PackageFare[];

    @OneToMany(() => AdultInstallment, (installment) => installment.slot)
    adultInstallments: AdultInstallment[];

    @OneToMany(() => ChildInstallment, (installment) => installment.slot)
    childInstallments: ChildInstallment[];

    @OneToMany(() => InfantInstallment, (installment) => installment.slot)
    infantInstallments: InfantInstallment[];

    @OneToMany(() => AdultAddon, (addon) => addon.slot)
    adultAddons: AdultAddon[];

    @OneToMany(() => ChildAddon, (addon) => addon.slot)
    childAddons: ChildAddon[];

    @OneToMany(() => InfantAddon, (addon) => addon.slot)
    infantAddons: InfantAddon[];
}

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
}

@Entity('adult_installments')
@Index(['packageId', 'slotId'], { unique: true }) // Composite unique index
export class AdultInstallment {
    @PrimaryColumn()
    packageId: number;

    @PrimaryColumn()
    slotId: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
    firstInstallment: number;

    @Column({ type: 'date' })
    firstInstallmentDueDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
    secondInstallment: number;

    @Column({ type: 'date' })
    secondInstallmentDueDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
    thirdInstallment: number;

    @Column({ type: 'date' })
    thirdInstallmentDueDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relationships
    @ManyToOne(() => Package, (pkg) => pkg.adultInstallments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'packageId' })
    package: Package;

    @ManyToOne(() => Slot, (slot) => slot.adultInstallments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'slotId' })
    slot: Slot;
}

@Entity('child_installments')
@Index(['packageId', 'slotId'], { unique: true }) // Composite unique index
export class ChildInstallment {
    @PrimaryColumn()
    packageId: number;
    
    @PrimaryColumn()
    slotId: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
    firstInstallment: number;

    @Column({ type: 'date' })
    firstInstallmentDueDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
    secondInstallment: number;

    @Column({ type: 'date' })
    secondInstallmentDueDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
    thirdInstallment: number;

    @Column({ type: 'date' })
    thirdInstallmentDueDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relationships
    @ManyToOne(() => Package, (pkg) => pkg.childInstallments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'packageId' })
    package: Package;

    @ManyToOne(() => Slot, (slot) => slot.childInstallments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'slotId' })
    slot: Slot;
}

@Entity('infant_installments')
@Index(['packageId', 'slotId'], { unique: true }) // Composite unique index
export class InfantInstallment {
    @PrimaryColumn()
    packageId: number;

    @PrimaryColumn()
    slotId: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
    firstInstallment: number;

    @Column({ type: 'date' })
    firstInstallmentDueDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
    secondInstallment: number;

    @Column({ type: 'date' })
    secondInstallmentDueDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
    thirdInstallment: number;

    @Column({ type: 'date' })
    thirdInstallmentDueDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relationships
    @ManyToOne(() => Package, (pkg) => pkg.infantInstallments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'packageId' })
    package: Package;

    @ManyToOne(() => Slot, (slot) => slot.infantInstallments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'slotId' })
    slot: Slot;
}

@Entity('adult_addons')
@Index(['packageId', 'slotId'], { unique: true }) // Composite unique index
export class AdultAddon {

    @PrimaryColumn()
    packageId: number;

    @PrimaryColumn()
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
    @ManyToOne(() => Package, (pkg) => pkg.adultAddons, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'packageId' })
    package: Package;

    @ManyToOne(() => Slot, (slot) => slot.adultAddons, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'slotId' })
    slot: Slot;
}

@Entity('child_addons')
@Index(['packageId', 'slotId'], { unique: true }) // Composite unique index
export class ChildAddon {
    @PrimaryColumn()
    packageId: number;

    @PrimaryColumn()
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

@Entity('infant_addons')
@Index(['packageId', 'slotId'], { unique: true }) // Composite unique index
export class InfantAddon {
    @PrimaryColumn()
    packageId: number;

    @PrimaryColumn()
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
    @ManyToOne(() => Package, (pkg) => pkg.infantAddons, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'packageId' })
    package: Package;

    @ManyToOne(() => Slot, (slot) => slot.infantAddons, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'slotId' })
    slot: Slot;
}