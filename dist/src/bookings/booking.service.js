"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./booking.entity");
let BookingService = class BookingService {
    bookingRepository;
    concernPersonRepository;
    passengerRepository;
    paymentRepository;
    constructor(bookingRepository, concernPersonRepository, passengerRepository, paymentRepository) {
        this.bookingRepository = bookingRepository;
        this.concernPersonRepository = concernPersonRepository;
        this.passengerRepository = passengerRepository;
        this.paymentRepository = paymentRepository;
    }
    async createBooking(createBookingDto) {
        const { concernPersons, passengers, ...bookingData } = createBookingDto;
        const booking = this.bookingRepository.create(bookingData);
        const savedBooking = await this.bookingRepository.save(booking);
        const concernPersonPromises = concernPersons.map(cp => this.concernPersonRepository.save({
            ...cp,
            bookingId: savedBooking.id
        }));
        const passengerPromises = passengers.map(passenger => this.passengerRepository.save({
            ...passenger,
            bookingId: savedBooking.id
        }));
        const [savedConcernPersons, savedPassengers] = await Promise.all([
            Promise.all(concernPersonPromises),
            Promise.all(passengerPromises),
        ]);
        return this.getBookingById(savedBooking.id);
    }
    async getAllBookings(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [bookings, total] = await this.bookingRepository.findAndCount({
            relations: ['package', 'slot', 'concernPersons', 'passengers', 'addons', 'payments'],
            skip,
            take: limit,
            order: { createdAt: 'DESC' }
        });
        return {
            bookings: bookings,
            total,
            totalPages: Math.ceil(total / limit)
        };
    }
    async getBookingById(id) {
        const booking = await this.bookingRepository.findOne({
            where: { id },
            relations: ['package', 'slot', 'concernPersons', 'passengers', 'addons', 'payments']
        });
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        }
        return booking;
    }
    async updateBooking(id, updateBookingDto) {
        const booking = await this.bookingRepository.findOne({ where: { id } });
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        }
        await this.bookingRepository.update(id, updateBookingDto);
        return this.getBookingById(id);
    }
    async deleteBooking(id) {
        const booking = await this.bookingRepository.findOne({ where: { id } });
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        }
        await this.bookingRepository.delete(id);
    }
    async getConcernPersonsByBookingId(bookingId) {
        return this.concernPersonRepository.find({ where: { bookingId } });
    }
    async updateConcernPerson(id, updateDto) {
        const concernPerson = await this.concernPersonRepository.findOne({ where: { id } });
        if (!concernPerson) {
            throw new common_1.NotFoundException(`Concern person with ID ${id} not found`);
        }
        await this.concernPersonRepository.update(id, updateDto);
        const updatedConcernPerson = await this.concernPersonRepository.findOne({ where: { id } });
        if (!updatedConcernPerson) {
            throw new common_1.NotFoundException(`Concern person with ID ${id} not found after update`);
        }
        return updatedConcernPerson;
    }
    async deleteConcernPerson(id) {
        const result = await this.concernPersonRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Concern person with ID ${id} not found`);
        }
    }
    async getPassengersByBookingId(bookingId) {
        return this.passengerRepository.find({ where: { bookingId } });
    }
    async updatePassenger(id, updateDto) {
        const passenger = await this.passengerRepository.findOne({ where: { id } });
        if (!passenger) {
            throw new common_1.NotFoundException(`Passenger with ID ${id} not found`);
        }
        await this.passengerRepository.update(id, updateDto);
        const updatedPassenger = await this.passengerRepository.findOne({ where: { id } });
        if (!updatedPassenger) {
            throw new common_1.NotFoundException(`Passenger with ID ${id} not found after update`);
        }
        return updatedPassenger;
    }
    async deletePassenger(id) {
        const result = await this.passengerRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Passenger with ID ${id} not found`);
        }
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(booking_entity_1.BookingConcernPerson)),
    __param(2, (0, typeorm_1.InjectRepository)(booking_entity_1.BookingPassenger)),
    __param(3, (0, typeorm_1.InjectRepository)(booking_entity_1.BookingPayment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookingService);
//# sourceMappingURL=booking.service.js.map