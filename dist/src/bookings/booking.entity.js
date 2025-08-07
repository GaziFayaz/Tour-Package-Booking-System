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
exports.BookingPayment = exports.BookingPassenger = exports.BookingConcernPerson = exports.Booking = exports.PaymentType = exports.PaymentStatus = exports.BookingStatus = exports.Gender = exports.PassengerType = void 0;
const typeorm_1 = require("typeorm");
const packages_entity_1 = require("../packages/packages.entity");
var PassengerType;
(function (PassengerType) {
    PassengerType["ADULT"] = "adult";
    PassengerType["CHILD"] = "child";
    PassengerType["INFANT"] = "infant";
})(PassengerType || (exports.PassengerType = PassengerType = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
    Gender["OTHER"] = "other";
})(Gender || (exports.Gender = Gender = {}));
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["COMPLETED"] = "completed";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["PAID"] = "paid";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType["FULL_PAYMENT"] = "full_payment";
    PaymentType["INSTALLMENT"] = "installment";
})(PaymentType || (exports.PaymentType = PaymentType = {}));
let Booking = class Booking {
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
};
exports.Booking = Booking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Booking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Booking.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Booking.prototype, "slotId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BookingStatus,
        default: BookingStatus.COMPLETED
    }),
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING
    }),
    __metadata("design:type", String)
], Booking.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Booking.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Booking.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Booking.prototype, "pendingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "specialInstructions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => packages_entity_1.Package, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'packageId' }),
    __metadata("design:type", packages_entity_1.Package)
], Booking.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => packages_entity_1.Slot, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'slotId' }),
    __metadata("design:type", packages_entity_1.Slot)
], Booking.prototype, "slot", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BookingConcernPerson, (concernPerson) => concernPerson.booking),
    __metadata("design:type", Array)
], Booking.prototype, "concernPersons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BookingPassenger, (passenger) => passenger.booking),
    __metadata("design:type", Array)
], Booking.prototype, "passengers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BookingPayment, (payment) => payment.booking),
    __metadata("design:type", Array)
], Booking.prototype, "payments", void 0);
exports.Booking = Booking = __decorate([
    (0, typeorm_1.Entity)('bookings')
], Booking);
let BookingConcernPerson = class BookingConcernPerson {
    id;
    bookingId;
    name;
    email;
    phone;
    address;
    createdAt;
    updatedAt;
    booking;
};
exports.BookingConcernPerson = BookingConcernPerson;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BookingConcernPerson.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BookingConcernPerson.prototype, "bookingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], BookingConcernPerson.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    __metadata("design:type", String)
], BookingConcernPerson.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, unique: true }),
    __metadata("design:type", String)
], BookingConcernPerson.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], BookingConcernPerson.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BookingConcernPerson.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BookingConcernPerson.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Booking, (booking) => booking.concernPersons, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'bookingId' }),
    __metadata("design:type", Booking)
], BookingConcernPerson.prototype, "booking", void 0);
exports.BookingConcernPerson = BookingConcernPerson = __decorate([
    (0, typeorm_1.Entity)('booking_concern_persons')
], BookingConcernPerson);
let BookingPassenger = class BookingPassenger {
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
    adultAddonPackageId;
    adultAddonSlotId;
    childAddonPackageId;
    childAddonSlotId;
    infantAddonPackageId;
    infantAddonSlotId;
    createdAt;
    updatedAt;
    booking;
    adultAddon;
    childAddon;
    infantAddon;
};
exports.BookingPassenger = BookingPassenger;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BookingPassenger.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BookingPassenger.prototype, "bookingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], BookingPassenger.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], BookingPassenger.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PassengerType
    }),
    __metadata("design:type", String)
], BookingPassenger.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], BookingPassenger.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], BookingPassenger.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], BookingPassenger.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Gender
    }),
    __metadata("design:type", String)
], BookingPassenger.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], BookingPassenger.prototype, "passportNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], BookingPassenger.prototype, "passportScanUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], BookingPassenger.prototype, "tShirtSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BookingPassenger.prototype, "foodRestrictions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BookingPassenger.prototype, "specialInstructions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BookingPassenger.prototype, "sicknessInformation", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], BookingPassenger.prototype, "pickupPoint", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], BookingPassenger.prototype, "adultAddonPackageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], BookingPassenger.prototype, "adultAddonSlotId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], BookingPassenger.prototype, "childAddonPackageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], BookingPassenger.prototype, "childAddonSlotId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], BookingPassenger.prototype, "infantAddonPackageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], BookingPassenger.prototype, "infantAddonSlotId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BookingPassenger.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BookingPassenger.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Booking, (booking) => booking.passengers, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'bookingId' }),
    __metadata("design:type", Booking)
], BookingPassenger.prototype, "booking", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => packages_entity_1.AdultAddon, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)([
        { name: 'adultAddonPackageId', referencedColumnName: 'packageId' },
        { name: 'adultAddonSlotId', referencedColumnName: 'slotId' }
    ]),
    __metadata("design:type", packages_entity_1.AdultAddon)
], BookingPassenger.prototype, "adultAddon", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => packages_entity_1.ChildAddon, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)([
        { name: 'childAddonPackageId', referencedColumnName: 'packageId' },
        { name: 'childAddonSlotId', referencedColumnName: 'slotId' }
    ]),
    __metadata("design:type", packages_entity_1.ChildAddon)
], BookingPassenger.prototype, "childAddon", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => packages_entity_1.InfantAddon, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)([
        { name: 'infantAddonPackageId', referencedColumnName: 'packageId' },
        { name: 'infantAddonSlotId', referencedColumnName: 'slotId' }
    ]),
    __metadata("design:type", packages_entity_1.InfantAddon)
], BookingPassenger.prototype, "infantAddon", void 0);
exports.BookingPassenger = BookingPassenger = __decorate([
    (0, typeorm_1.Entity)('booking_passengers')
], BookingPassenger);
let BookingPayment = class BookingPayment {
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
    booking;
};
exports.BookingPayment = BookingPayment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BookingPayment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BookingPayment.prototype, "bookingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], BookingPayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaymentType
    }),
    __metadata("design:type", String)
], BookingPayment.prototype, "paymentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], BookingPayment.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], BookingPayment.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'pending' }),
    __metadata("design:type", String)
], BookingPayment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], BookingPayment.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BookingPayment.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BookingPayment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BookingPayment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Booking, (booking) => booking.payments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'bookingId' }),
    __metadata("design:type", Booking)
], BookingPayment.prototype, "booking", void 0);
exports.BookingPayment = BookingPayment = __decorate([
    (0, typeorm_1.Entity)('booking_payments')
], BookingPayment);
//# sourceMappingURL=booking.entity.js.map