import { Repository } from 'typeorm';
import { Booking, BookingConcernPerson, BookingPassenger, BookingPayment } from './booking.entity';
import { CreateBookingDto, UpdateBookingDto, UpdateBookingConcernPersonDto, UpdateBookingPassengerDto, BookingResponseDto } from './booking.dto';
export declare class BookingService {
    private readonly bookingRepository;
    private readonly concernPersonRepository;
    private readonly passengerRepository;
    private readonly paymentRepository;
    constructor(bookingRepository: Repository<Booking>, concernPersonRepository: Repository<BookingConcernPerson>, passengerRepository: Repository<BookingPassenger>, paymentRepository: Repository<BookingPayment>);
    createBooking(createBookingDto: CreateBookingDto): Promise<BookingResponseDto>;
    getAllBookings(page?: number, limit?: number): Promise<{
        bookings: BookingResponseDto[];
        total: number;
        totalPages: number;
    }>;
    getBookingById(id: number): Promise<BookingResponseDto>;
    updateBooking(id: number, updateBookingDto: UpdateBookingDto): Promise<BookingResponseDto>;
    deleteBooking(id: number): Promise<void>;
    getConcernPersonsByBookingId(bookingId: number): Promise<BookingConcernPerson[]>;
    updateConcernPerson(id: number, updateDto: UpdateBookingConcernPersonDto): Promise<BookingConcernPerson>;
    deleteConcernPerson(id: number): Promise<void>;
    getPassengersByBookingId(bookingId: number): Promise<BookingPassenger[]>;
    updatePassenger(id: number, updateDto: UpdateBookingPassengerDto): Promise<BookingPassenger>;
    deletePassenger(id: number): Promise<void>;
}
