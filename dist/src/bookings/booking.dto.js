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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSummaryDto = exports.BookingResponseDto = exports.BookingPaymentResponseDto = exports.BookingPassengerResponseDto = exports.BookingConcernPersonResponseDto = exports.CreateBookingPaymentDto = exports.UpdateBookingPassengerDto = exports.UpdateBookingConcernPersonDto = exports.UpdateBookingDto = exports.CreateBookingDto = exports.CreateBookingPassengerDto = exports.CreateBookingConcernPersonDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const booking_entity_1 = require("./booking.entity");
class CreateBookingConcernPersonDto {
    name;
    email;
    phone;
    address;
}
exports.CreateBookingConcernPersonDto = CreateBookingConcernPersonDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingConcernPersonDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateBookingConcernPersonDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingConcernPersonDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingConcernPersonDto.prototype, "address", void 0);
class CreateBookingPassengerDto {
    email;
    phone;
    type;
    firstName;
    lastName;
    dateOfBirth;
    gender;
    passportNumber;
    passportScanUrl;
    tShirtSize;
    foodRestrictions;
    specialInstructions;
    sicknessInformation;
    pickupPoint;
    fareAmount;
}
exports.CreateBookingPassengerDto = CreateBookingPassengerDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateBookingPassengerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingPassengerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(booking_entity_1.PassengerType),
    __metadata("design:type", String)
], CreateBookingPassengerDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingPassengerDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingPassengerDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBookingPassengerDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(booking_entity_1.Gender),
    __metadata("design:type", String)
], CreateBookingPassengerDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingPassengerDto.prototype, "passportNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingPassengerDto.prototype, "passportScanUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingPassengerDto.prototype, "tShirtSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingPassengerDto.prototype, "foodRestrictions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingPassengerDto.prototype, "specialInstructions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingPassengerDto.prototype, "sicknessInformation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingPassengerDto.prototype, "pickupPoint", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBookingPassengerDto.prototype, "fareAmount", void 0);
class CreateBookingDto {
    packageId;
    slotId;
    status;
    paymentStatus;
    totalAmount;
    paidAmount;
    pendingAmount;
    specialInstructions;
    notes;
    concernPersons;
    passengers;
}
exports.CreateBookingDto = CreateBookingDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "packageId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "slotId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(booking_entity_1.BookingStatus),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(booking_entity_1.PaymentStatus),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "totalAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "paidAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "pendingAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "specialInstructions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateBookingConcernPersonDto),
    __metadata("design:type", Array)
], CreateBookingDto.prototype, "concernPersons", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateBookingPassengerDto),
    __metadata("design:type", Array)
], CreateBookingDto.prototype, "passengers", void 0);
class UpdateBookingDto {
    status;
    paymentStatus;
    totalAmount;
    paidAmount;
    pendingAmount;
    specialInstructions;
    notes;
}
exports.UpdateBookingDto = UpdateBookingDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(booking_entity_1.BookingStatus),
    __metadata("design:type", String)
], UpdateBookingDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(booking_entity_1.PaymentStatus),
    __metadata("design:type", String)
], UpdateBookingDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateBookingDto.prototype, "totalAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateBookingDto.prototype, "paidAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateBookingDto.prototype, "pendingAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingDto.prototype, "specialInstructions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingDto.prototype, "notes", void 0);
class UpdateBookingConcernPersonDto {
    name;
    email;
    phone;
    address;
}
exports.UpdateBookingConcernPersonDto = UpdateBookingConcernPersonDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingConcernPersonDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateBookingConcernPersonDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingConcernPersonDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingConcernPersonDto.prototype, "address", void 0);
class UpdateBookingPassengerDto {
    email;
    phone;
    type;
    firstName;
    lastName;
    dateOfBirth;
    gender;
    passportNumber;
    passportScanUrl;
    tShirtSize;
    foodRestrictions;
    specialInstructions;
    sicknessInformation;
    pickupPoint;
    fareAmount;
}
exports.UpdateBookingPassengerDto = UpdateBookingPassengerDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateBookingPassengerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingPassengerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(booking_entity_1.PassengerType),
    __metadata("design:type", String)
], UpdateBookingPassengerDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingPassengerDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingPassengerDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateBookingPassengerDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(booking_entity_1.Gender),
    __metadata("design:type", String)
], UpdateBookingPassengerDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingPassengerDto.prototype, "passportNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingPassengerDto.prototype, "passportScanUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingPassengerDto.prototype, "tShirtSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingPassengerDto.prototype, "foodRestrictions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingPassengerDto.prototype, "specialInstructions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingPassengerDto.prototype, "sicknessInformation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingPassengerDto.prototype, "pickupPoint", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateBookingPassengerDto.prototype, "fareAmount", void 0);
class CreateBookingPaymentDto {
    bookingId;
    amount;
    paymentType;
    paymentMethod;
    transactionId;
    status;
    notes;
}
exports.CreateBookingPaymentDto = CreateBookingPaymentDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBookingPaymentDto.prototype, "bookingId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBookingPaymentDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(booking_entity_1.PaymentType),
    __metadata("design:type", String)
], CreateBookingPaymentDto.prototype, "paymentType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingPaymentDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingPaymentDto.prototype, "transactionId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingPaymentDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingPaymentDto.prototype, "notes", void 0);
class BookingConcernPersonResponseDto {
    id;
    bookingId;
    name;
    email;
    phone;
    address;
    createdAt;
    updatedAt;
}
exports.BookingConcernPersonResponseDto = BookingConcernPersonResponseDto;
class BookingPassengerResponseDto {
    id;
    bookingId;
    email;
    phone;
    type;
    firstName;
    lastName;
    dateOfBirth;
    gender;
    passportNumber;
    passportScanUrl;
    tShirtSize;
    foodRestrictions;
    specialInstructions;
    sicknessInformation;
    pickupPoint;
    fareAmount;
    createdAt;
    updatedAt;
}
exports.BookingPassengerResponseDto = BookingPassengerResponseDto;
class BookingPaymentResponseDto {
    id;
    bookingId;
    amount;
    paymentType;
    paymentMethod;
    transactionId;
    status;
    paidAt;
    notes;
    createdAt;
    updatedAt;
}
exports.BookingPaymentResponseDto = BookingPaymentResponseDto;
class BookingResponseDto {
    id;
    packageId;
    slotId;
    status;
    paymentStatus;
    totalAmount;
    paidAmount;
    pendingAmount;
    specialInstructions;
    notes;
    createdAt;
    updatedAt;
    package;
    slot;
    concernPersons;
    passengers;
    payments;
}
exports.BookingResponseDto = BookingResponseDto;
class BookingSummaryDto {
    totalBookings;
    totalAmount;
    totalPaid;
    totalPending;
    adultPassengers;
    childPassengers;
    infantPassengers;
    statusBreakdown;
    paymentStatusBreakdown;
}
exports.BookingSummaryDto = BookingSummaryDto;
//# sourceMappingURL=booking.dto.js.map