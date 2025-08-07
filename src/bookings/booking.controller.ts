import { Controller, Post, Body, HttpStatus, HttpCode, Get, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './booking.dto';
import { Booking } from './entities';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingService.createBooking(createBookingDto);
  }

  // @Get(":id")
  // async getBookingFareDetails(@Param('id') id: number): Promise<any> {
  //   return await this.bookingService.getBookingById(id);
  // }
}
