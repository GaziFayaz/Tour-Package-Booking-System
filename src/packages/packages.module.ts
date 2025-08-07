import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  Package, 
  Slot, 
  PackageFare, 
  AdultInstallment, 
  ChildInstallment, 
  InfantInstallment,
  AdultAddon,
  ChildAddon,
  InfantAddon
} from './packages.entity';
import { PackagesService } from './packages.service';
import { 
  PackagesController, 
  SlotsController, 
  PackageFaresController, 
  AdultInstallmentsController, 
  ChildInstallmentsController, 
  InfantInstallmentsController,
  AdultAddonsController,
  ChildAddonsController,
  InfantAddonsController
} from './packages.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Package,
      Slot,
      PackageFare,
      AdultInstallment,
      ChildInstallment,
      InfantInstallment,
      AdultAddon,
      ChildAddon,
      InfantAddon
    ])
  ],
  controllers: [
    PackagesController,
    SlotsController,
    PackageFaresController,
    AdultInstallmentsController,
    ChildInstallmentsController,
    InfantInstallmentsController,
    AdultAddonsController,
    ChildAddonsController,
    InfantAddonsController
  ],
  providers: [PackagesService],
  exports: [PackagesService, TypeOrmModule],
})
export class PackagesModule {}
