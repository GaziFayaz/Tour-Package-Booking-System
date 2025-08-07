import { Package, Slot, AdultAddon, ChildAddon, InfantAddon } from '../packages/packages.entity';
export declare enum PassengerType {
    ADULT = "adult",
    CHILD = "child",
    INFANT = "infant"
}
export declare enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}
export declare enum BookingStatus {
    COMPLETED = "completed"
}
export declare enum PaymentStatus {
    PENDING = "pending",
    PAID = "paid"
}
export declare enum PaymentType {
    FULL_PAYMENT = "full_payment",
    INSTALLMENT = "installment"
}
export declare class Booking {
    id: number;
    packageId: number;
    slotId: number;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;
    specialInstructions: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    package: Package;
    slot: Slot;
    concernPersons: BookingConcernPerson[];
    passengers: BookingPassenger[];
    payments: BookingPayment[];
}
export declare class BookingConcernPerson {
    id: number;
    bookingId: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    booking: Booking;
}
export declare class BookingPassenger {
    id: number;
    bookingId: number;
    email: string;
    phone: string;
    type: PassengerType;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: Gender;
    passportNumber: string;
    passportScanUrl: string;
    tShirtSize: string;
    foodRestrictions: string;
    specialInstructions: string;
    sicknessInformation: string;
    pickupPoint: string;
    adultAddonPackageId: number;
    adultAddonSlotId: number;
    childAddonPackageId: number;
    childAddonSlotId: number;
    infantAddonPackageId: number;
    infantAddonSlotId: number;
    createdAt: Date;
    updatedAt: Date;
    booking: Booking;
    adultAddon?: AdultAddon;
    childAddon?: ChildAddon;
    infantAddon?: InfantAddon;
}
export declare class BookingPayment {
    id: number;
    bookingId: number;
    amount: number;
    paymentType: PaymentType;
    paymentMethod: string;
    transactionId: string;
    status: string;
    paidAt: Date;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    booking: Booking;
}
