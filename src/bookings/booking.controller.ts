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
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN) // Only admins and super admins can manage bookings
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
