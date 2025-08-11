import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './booking.dto';
import { Booking } from './entities';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Get(':id')
  async getBookingFareDetails(@Param('id') id: number): Promise<Booking> {
    return await this.bookingService.getBookingFareDetails(id);
  }
}
