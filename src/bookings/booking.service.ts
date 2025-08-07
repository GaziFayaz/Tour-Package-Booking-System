import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import {
  Booking,
  BookingConcernPerson,
  BookingPassenger,
  BookingPayment,
  BookingStatus,
  PaymentStatus,
  PaymentType
} from './booking.entity';
import {
  CreateBookingDto,
  UpdateBookingDto,
  UpdateBookingConcernPersonDto,
  UpdateBookingPassengerDto,
  CreateBookingPaymentDto,
  BookingSummaryDto,
  BookingResponseDto
} from './booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(BookingConcernPerson)
    private readonly concernPersonRepository: Repository<BookingConcernPerson>,
    @InjectRepository(BookingPassenger)
    private readonly passengerRepository: Repository<BookingPassenger>,
    @InjectRepository(BookingPayment)
    private readonly paymentRepository: Repository<BookingPayment>,
  ) {}

  // Create a new booking with all related data
  async createBooking(createBookingDto: CreateBookingDto): Promise<BookingResponseDto> {
    const { concernPersons, passengers, ...bookingData } = createBookingDto;

    // Create the main booking
    const booking = this.bookingRepository.create(bookingData);
    const savedBooking = await this.bookingRepository.save(booking);

    // Create concern persons
    const concernPersonPromises = concernPersons.map(cp => 
      this.concernPersonRepository.save({
        ...cp,
        bookingId: savedBooking.id
      })
    );

    // Create passengers
    const passengerPromises = passengers.map(passenger => 
      this.passengerRepository.save({
        ...passenger,
        bookingId: savedBooking.id
      })
    );

    // Execute all promises in parallel
    const [savedConcernPersons, savedPassengers] = await Promise.all([
      Promise.all(concernPersonPromises),
      Promise.all(passengerPromises),
    ]);

    // Return complete booking with relations
    return this.getBookingById(savedBooking.id);
  }

  // Get all bookings with pagination
  async getAllBookings(page: number = 1, limit: number = 10): Promise<{ bookings: BookingResponseDto[], total: number, totalPages: number }> {
    const skip = (page - 1) * limit;
    
    const [bookings, total] = await this.bookingRepository.findAndCount({
      relations: ['package', 'slot', 'concernPersons', 'passengers', 'addons', 'payments'],
      skip,
      take: limit,
      order: { createdAt: 'DESC' }
    });

    return {
      bookings: bookings as BookingResponseDto[],
      total,
      totalPages: Math.ceil(total / limit)
    };
  }

  // Get booking by ID with all relations
  async getBookingById(id: number): Promise<BookingResponseDto> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['package', 'slot', 'concernPersons', 'passengers', 'addons', 'payments']
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking as BookingResponseDto;
  }

  // Update booking
  async updateBooking(id: number, updateBookingDto: UpdateBookingDto): Promise<BookingResponseDto> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    await this.bookingRepository.update(id, updateBookingDto);
    return this.getBookingById(id);
  }

  // Delete booking
  async deleteBooking(id: number): Promise<void> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    await this.bookingRepository.delete(id);
  }

  // Concern Person operations
  async getConcernPersonsByBookingId(bookingId: number): Promise<BookingConcernPerson[]> {
    return this.concernPersonRepository.find({ where: { bookingId } });
  }

  async updateConcernPerson(id: number, updateDto: UpdateBookingConcernPersonDto): Promise<BookingConcernPerson> {
    const concernPerson = await this.concernPersonRepository.findOne({ where: { id } });
    
    if (!concernPerson) {
      throw new NotFoundException(`Concern person with ID ${id} not found`);
    }

    await this.concernPersonRepository.update(id, updateDto);
    const updatedConcernPerson = await this.concernPersonRepository.findOne({ where: { id } });
    
    if (!updatedConcernPerson) {
      throw new NotFoundException(`Concern person with ID ${id} not found after update`);
    }
    
    return updatedConcernPerson;
  }

  async deleteConcernPerson(id: number): Promise<void> {
    const result = await this.concernPersonRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Concern person with ID ${id} not found`);
    }
  }

  // Passenger operations
  async getPassengersByBookingId(bookingId: number): Promise<BookingPassenger[]> {
    return this.passengerRepository.find({ where: { bookingId } });
  }

  async updatePassenger(id: number, updateDto: UpdateBookingPassengerDto): Promise<BookingPassenger> {
    const passenger = await this.passengerRepository.findOne({ where: { id } });
    
    if (!passenger) {
      throw new NotFoundException(`Passenger with ID ${id} not found`);
    }

    await this.passengerRepository.update(id, updateDto);
    const updatedPassenger = await this.passengerRepository.findOne({ where: { id } });
    
    if (!updatedPassenger) {
      throw new NotFoundException(`Passenger with ID ${id} not found after update`);
    }
    
    return updatedPassenger;
  }

  async deletePassenger(id: number): Promise<void> {
    const result = await this.passengerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Passenger with ID ${id} not found`);
    }
  }
}