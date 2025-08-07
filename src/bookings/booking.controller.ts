import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { BookingService } from './booking.service';
import {
  CreateBookingDto,
  UpdateBookingDto,
  BookingResponseDto
} from './booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // Main booking operations
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<BookingResponseDto> {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Get()
  async getAllBookings(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10
  ): Promise<{ bookings: BookingResponseDto[], total: number, totalPages: number }> {
    return this.bookingService.getAllBookings(page, limit);
  }

  @Get(':id')
  async getBookingById(@Param('id', ParseIntPipe) id: number): Promise<BookingResponseDto> {
    return this.bookingService.getBookingById(id);
  }

  @Put(':id')
  async updateBooking(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingDto: UpdateBookingDto
  ): Promise<BookingResponseDto> {
    return this.bookingService.updateBooking(id, updateBookingDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBooking(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.bookingService.deleteBooking(id);
  }
}
