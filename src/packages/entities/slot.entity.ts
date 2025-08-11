import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PackageFare } from './package-fare.entity';
import { AdultAddon } from './adult-addon.entity';
import { ChildAddon } from './child-addon.entity';
import { InfantAddon } from './infant-addon.entity';

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

  @OneToMany(() => AdultAddon, (addon) => addon.slot)
  adultAddons: AdultAddon[];

  @OneToMany(() => ChildAddon, (addon) => addon.slot)
  childAddons: ChildAddon[];

  @OneToMany(() => InfantAddon, (addon) => addon.slot)
  infantAddons: InfantAddon[];
}
