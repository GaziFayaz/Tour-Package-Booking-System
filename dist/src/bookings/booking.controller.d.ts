import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto, BookingResponseDto } from './booking.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    createBooking(createBookingDto: CreateBookingDto): Promise<BookingResponseDto>;
    getAllBookings(page?: number, limit?: number): Promise<{
        bookings: BookingResponseDto[];
        total: number;
        totalPages: number;
    }>;
    getBookingById(id: number): Promise<BookingResponseDto>;
    updateBooking(id: number, updateBookingDto: UpdateBookingDto): Promise<BookingResponseDto>;
    deleteBooking(id: number): Promise<void>;
}
