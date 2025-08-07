import { IsEnum, IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsOptional, IsNumber, IsDateString, IsArray, ValidateNested, IsDecimal, Min } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { PassengerType, Gender, BookingStatus, PaymentStatus, PaymentType } from './booking.entity';

// Create Booking DTOs
export class CreateBookingConcernPersonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}

export class CreateBookingPassengerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsEnum(PassengerType)
  type: PassengerType;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsDateString()
  dateOfBirth: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsString()
  passportNumber?: string;

  @IsOptional()
  @IsString()
  passportScanUrl?: string;

  @IsOptional()
  @IsString()
  tShirtSize?: string;

  @IsOptional()
  @IsString()
  foodRestrictions?: string;

  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @IsOptional()
  @IsString()
  sicknessInformation?: string;

  @IsOptional()
  @IsString()
  pickupPoint?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  fareAmount: number;
}

export class CreateBookingDto {
  @IsNumber()
  packageId: number;

  @IsNumber()
  slotId: number;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  totalAmount: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  paidAmount?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  pendingAmount?: number;

  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBookingConcernPersonDto)
  concernPersons: CreateBookingConcernPersonDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBookingPassengerDto)
  passengers: CreateBookingPassengerDto[];
}

// Update Booking DTOs
export class UpdateBookingDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  totalAmount?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  paidAmount?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  pendingAmount?: number;

  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateBookingConcernPersonDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}

export class UpdateBookingPassengerDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(PassengerType)
  type?: PassengerType;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  passportNumber?: string;

  @IsOptional()
  @IsString()
  passportScanUrl?: string;

  @IsOptional()
  @IsString()
  tShirtSize?: string;

  @IsOptional()
  @IsString()
  foodRestrictions?: string;

  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @IsOptional()
  @IsString()
  sicknessInformation?: string;

  @IsOptional()
  @IsString()
  pickupPoint?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  fareAmount?: number;
}

// Payment DTOs
export class CreateBookingPaymentDto {
  @IsNumber()
  bookingId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  amount: number;

  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

// Response DTOs
export class BookingConcernPersonResponseDto {
  id: number;
  bookingId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export class BookingPassengerResponseDto {
  id: number;
  bookingId: number;
  email: string;
  phone: string;
  type: PassengerType;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  passportNumber?: string;
  passportScanUrl?: string;
  tShirtSize?: string;
  foodRestrictions?: string;
  specialInstructions?: string;
  sicknessInformation?: string;
  pickupPoint?: string;
  fareAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class BookingPaymentResponseDto {
  id: number;
  bookingId: number;
  amount: number;
  paymentType: PaymentType;
  paymentMethod: string;
  transactionId?: string;
  status: string;
  paidAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class BookingResponseDto {
  id: number;
  packageId: number;
  slotId: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  specialInstructions?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  package?: any; // Will be populated with Package entity
  slot?: any; // Will be populated with Slot entity
  concernPersons: BookingConcernPersonResponseDto[];
  passengers: BookingPassengerResponseDto[];
  payments: BookingPaymentResponseDto[];
}

// Summary DTOs for analytics
export class BookingSummaryDto {
  totalBookings: number;
  totalAmount: number;
  totalPaid: number;
  totalPending: number;
  adultPassengers: number;
  childPassengers: number;
  infantPassengers: number;
  statusBreakdown: {
    draft: number;
    confirmed: number;
    cancelled: number;
    completed: number;
  };
  paymentStatusBreakdown: {
    pending: number;
    partial: number;
    paid: number;
    refunded: number;
  };
}
