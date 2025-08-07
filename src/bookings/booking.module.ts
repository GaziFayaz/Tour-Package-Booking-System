import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking, BookingConcernPerson, BookingPassenger, BookingPayment } from './entities';
import { AdultAddon, ChildAddon, InfantAddon, Package, PackageFare, Slot } from 'src/packages/entities';

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
      InfantAddon
    ])
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingModule {}
