import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToMany
} from "typeorm";

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
    @OneToMany('PackageFare', 'slot')
    fares: any[];

    @OneToMany('AdultAddon', 'slot')
    adultAddons: any[];

    @OneToMany('ChildAddon', 'slot')
    childAddons: any[];

    @OneToMany('InfantAddon', 'slot')
    infantAddons: any[];
}
