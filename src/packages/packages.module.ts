import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  Package, 
  Slot, 
  PackageFare, 
  InstallmentPlan,
  AdultInstallmentValue,
  ChildInstallmentValue,
  InfantInstallmentValue,
  AdultAddon,
  ChildAddon,
  InfantAddon
} from './entities';
import { PackagesService } from './packages.service';
import { 
  PackagesController, 
  SlotsController, 
  PackageFaresController, 
  InstallmentPlansController,
  AdultInstallmentValuesController,
  ChildInstallmentValuesController,
  InfantInstallmentValuesController,
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
      InstallmentPlan,
      AdultInstallmentValue,
      ChildInstallmentValue,
      InfantInstallmentValue,
      AdultAddon,
      ChildAddon,
      InfantAddon
    ])
  ],
  controllers: [
    PackagesController,
    SlotsController,
    PackageFaresController,
    InstallmentPlansController,
    AdultInstallmentValuesController,
    ChildInstallmentValuesController,
    InfantInstallmentValuesController,
    AdultAddonsController,
    ChildAddonsController,
    InfantAddonsController
  ],
  providers: [PackagesService],
  exports: [PackagesService, TypeOrmModule],
})
export class PackagesModule {}
