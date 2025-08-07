import { PassengerType, Gender, BookingStatus, PaymentStatus, PaymentType } from './booking.entity';
export declare class CreateBookingConcernPersonDto {
    name: string;
    email: string;
    phone: string;
    address: string;
}
export declare class CreateBookingPassengerDto {
    email: string;
    phone: string;
    type: PassengerType;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: Gender;
    passportNumber?: string;
    passportScanUrl?: string;
    tShirtSize?: string;
    foodRestrictions?: string;
    specialInstructions?: string;
    sicknessInformation?: string;
    pickupPoint?: string;
    fareAmount: number;
}
export declare class CreateBookingDto {
    packageId: number;
    slotId: number;
    status?: BookingStatus;
    paymentStatus?: PaymentStatus;
    totalAmount: number;
    paidAmount?: number;
    pendingAmount?: number;
    specialInstructions?: string;
    notes?: string;
    concernPersons: CreateBookingConcernPersonDto[];
    passengers: CreateBookingPassengerDto[];
}
export declare class UpdateBookingDto {
    status?: BookingStatus;
    paymentStatus?: PaymentStatus;
    totalAmount?: number;
    paidAmount?: number;
    pendingAmount?: number;
    specialInstructions?: string;
    notes?: string;
}
export declare class UpdateBookingConcernPersonDto {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
}
export declare class UpdateBookingPassengerDto {
    email?: string;
    phone?: string;
    type?: PassengerType;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: Gender;
    passportNumber?: string;
    passportScanUrl?: string;
    tShirtSize?: string;
    foodRestrictions?: string;
    specialInstructions?: string;
    sicknessInformation?: string;
    pickupPoint?: string;
    fareAmount?: number;
}
export declare class CreateBookingPaymentDto {
    bookingId: number;
    amount: number;
    paymentType: PaymentType;
    paymentMethod: string;
    transactionId?: string;
    status?: string;
    notes?: string;
}
export declare class BookingConcernPersonResponseDto {
    id: number;
    bookingId: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class BookingPassengerResponseDto {
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
export declare class BookingPaymentResponseDto {
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
export declare class BookingResponseDto {
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
    package?: any;
    slot?: any;
    concernPersons: BookingConcernPersonResponseDto[];
    passengers: BookingPassengerResponseDto[];
    payments: BookingPaymentResponseDto[];
}
export declare class BookingSummaryDto {
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
