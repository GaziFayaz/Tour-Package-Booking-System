import { 
  Column, 
  Entity, 
  PrimaryColumn,
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne,
  JoinColumn,
  Index
} from "typeorm";

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
    @ManyToOne('Package', 'childAddons', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'packageId' })
    package: any;

    @ManyToOne('Slot', 'childAddons', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'slotId' })
    slot: any;
}
