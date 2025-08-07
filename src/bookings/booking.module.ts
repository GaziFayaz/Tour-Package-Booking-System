import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  Booking, 
  BookingConcernPerson, 
  BookingPassenger,
  BookingPayment 
} from './booking.entity';
import { BookingService } from './booking.service';
import { 
  BookingController,
} from './booking.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Booking,
      BookingConcernPerson,
      BookingPassenger,
      BookingPayment
    ])
  ],
  controllers: [
    BookingController,
  ],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingModule {}
