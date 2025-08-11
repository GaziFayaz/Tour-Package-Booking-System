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

  @OneToMany(() => AdultAddon, (addon) => addon.package)
  adultAddons: AdultAddon[];

  @OneToMany(() => ChildAddon, (addon) => addon.package)
  childAddons: ChildAddon[];

  @OneToMany(() => InfantAddon, (addon) => addon.package)
  infantAddons: InfantAddon[];
}
