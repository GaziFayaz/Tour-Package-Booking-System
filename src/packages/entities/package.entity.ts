import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToMany
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
    @OneToMany('PackageFare', 'package')
    fares: any[];

    @OneToMany('AdultAddon', 'package')
    adultAddons: any[];

    @OneToMany('ChildAddon', 'package')
    childAddons: any[];

    @OneToMany('InfantAddon', 'package')
    infantAddons: any[];
}
