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

@Entity('infant_addons')
@Index(['packageId', 'slotId']) // Non-unique composite index for querying
export class InfantAddon {
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
  @ManyToOne('Package', 'infantAddons', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'packageId' })
  package: any;

  @ManyToOne('Slot', 'infantAddons', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'slotId' })
  slot: any;
}
