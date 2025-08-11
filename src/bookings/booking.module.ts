import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import {
  Booking,
  BookingConcernPerson,
  BookingPassenger,
  BookingPayment,
} from './entities';
import {
  AdultAddon,
  ChildAddon,
  InfantAddon,
  Package,
  PackageFare,
  Slot,
  InstallmentPlan,
  AdultInstallmentValue,
  ChildInstallmentValue,
  InfantInstallmentValue,
} from 'src/packages/entities';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Booking,
      BookingConcernPerson,
      BookingPassenger,
      BookingPayment,
      Package,
      Slot,
      PackageFare,
      AdultAddon,
      ChildAddon,
      InfantAddon,
      InstallmentPlan,
      AdultInstallmentValue,
      ChildInstallmentValue,
      InfantInstallmentValue,
    ]),
    AuthModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
