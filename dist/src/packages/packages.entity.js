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
exports.InfantAddon = exports.ChildAddon = exports.AdultAddon = exports.InfantInstallment = exports.ChildInstallment = exports.AdultInstallment = exports.PackageFare = exports.Slot = exports.Package = void 0;
const typeorm_1 = require("typeorm");
let Package = class Package {
    id;
    name;
    createdAt;
    updatedAt;
    fares;
    adultInstallments;
    childInstallments;
    infantInstallments;
    adultAddons;
    childAddons;
    infantAddons;
};
exports.Package = Package;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Package.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Package.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Package.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Package.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PackageFare, (fare) => fare.package),
    __metadata("design:type", Array)
], Package.prototype, "fares", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AdultInstallment, (installment) => installment.package),
    __metadata("design:type", Array)
], Package.prototype, "adultInstallments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ChildInstallment, (installment) => installment.package),
    __metadata("design:type", Array)
], Package.prototype, "childInstallments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InfantInstallment, (installment) => installment.package),
    __metadata("design:type", Array)
], Package.prototype, "infantInstallments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AdultAddon, (addon) => addon.package),
    __metadata("design:type", Array)
], Package.prototype, "adultAddons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ChildAddon, (addon) => addon.package),
    __metadata("design:type", Array)
], Package.prototype, "childAddons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InfantAddon, (addon) => addon.package),
    __metadata("design:type", Array)
], Package.prototype, "infantAddons", void 0);
exports.Package = Package = __decorate([
    (0, typeorm_1.Entity)('packages')
], Package);
let Slot = class Slot {
    id;
    name;
    seatCount;
    startDate;
    endDate;
    createdAt;
    updatedAt;
    fares;
    adultInstallments;
    childInstallments;
    infantInstallments;
    adultAddons;
    childAddons;
    infantAddons;
};
exports.Slot = Slot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Slot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Slot.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], Slot.prototype, "seatCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Slot.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Slot.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Slot.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Slot.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PackageFare, (fare) => fare.slot),
    __metadata("design:type", Array)
], Slot.prototype, "fares", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AdultInstallment, (installment) => installment.slot),
    __metadata("design:type", Array)
], Slot.prototype, "adultInstallments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ChildInstallment, (installment) => installment.slot),
    __metadata("design:type", Array)
], Slot.prototype, "childInstallments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InfantInstallment, (installment) => installment.slot),
    __metadata("design:type", Array)
], Slot.prototype, "infantInstallments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AdultAddon, (addon) => addon.slot),
    __metadata("design:type", Array)
], Slot.prototype, "adultAddons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ChildAddon, (addon) => addon.slot),
    __metadata("design:type", Array)
], Slot.prototype, "childAddons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InfantAddon, (addon) => addon.slot),
    __metadata("design:type", Array)
], Slot.prototype, "infantAddons", void 0);
exports.Slot = Slot = __decorate([
    (0, typeorm_1.Entity)('slots')
], Slot);
let PackageFare = class PackageFare {
    packageId;
    slotId;
    adultFare;
    childFare;
    infantFare;
    createdAt;
    updatedAt;
    package;
    slot;
};
exports.PackageFare = PackageFare;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], PackageFare.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], PackageFare.prototype, "slotId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], PackageFare.prototype, "adultFare", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], PackageFare.prototype, "childFare", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], PackageFare.prototype, "infantFare", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PackageFare.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PackageFare.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Package, (pkg) => pkg.fares, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'packageId' }),
    __metadata("design:type", Package)
], PackageFare.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Slot, (slot) => slot.fares, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'slotId' }),
    __metadata("design:type", Slot)
], PackageFare.prototype, "slot", void 0);
exports.PackageFare = PackageFare = __decorate([
    (0, typeorm_1.Entity)('package_fares'),
    (0, typeorm_1.Index)(['packageId', 'slotId'], { unique: true })
], PackageFare);
let AdultInstallment = class AdultInstallment {
    packageId;
    slotId;
    firstInstallment;
    firstInstallmentDueDate;
    secondInstallment;
    secondInstallmentDueDate;
    thirdInstallment;
    thirdInstallmentDueDate;
    createdAt;
    updatedAt;
    package;
    slot;
};
exports.AdultInstallment = AdultInstallment;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], AdultInstallment.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], AdultInstallment.prototype, "slotId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], AdultInstallment.prototype, "firstInstallment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], AdultInstallment.prototype, "firstInstallmentDueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], AdultInstallment.prototype, "secondInstallment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], AdultInstallment.prototype, "secondInstallmentDueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], AdultInstallment.prototype, "thirdInstallment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], AdultInstallment.prototype, "thirdInstallmentDueDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AdultInstallment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AdultInstallment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Package, (pkg) => pkg.adultInstallments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'packageId' }),
    __metadata("design:type", Package)
], AdultInstallment.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Slot, (slot) => slot.adultInstallments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'slotId' }),
    __metadata("design:type", Slot)
], AdultInstallment.prototype, "slot", void 0);
exports.AdultInstallment = AdultInstallment = __decorate([
    (0, typeorm_1.Entity)('adult_installments'),
    (0, typeorm_1.Index)(['packageId', 'slotId'], { unique: true })
], AdultInstallment);
let ChildInstallment = class ChildInstallment {
    packageId;
    slotId;
    firstInstallment;
    firstInstallmentDueDate;
    secondInstallment;
    secondInstallmentDueDate;
    thirdInstallment;
    thirdInstallmentDueDate;
    createdAt;
    updatedAt;
    package;
    slot;
};
exports.ChildInstallment = ChildInstallment;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ChildInstallment.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ChildInstallment.prototype, "slotId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], ChildInstallment.prototype, "firstInstallment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ChildInstallment.prototype, "firstInstallmentDueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], ChildInstallment.prototype, "secondInstallment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ChildInstallment.prototype, "secondInstallmentDueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], ChildInstallment.prototype, "thirdInstallment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ChildInstallment.prototype, "thirdInstallmentDueDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChildInstallment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ChildInstallment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Package, (pkg) => pkg.childInstallments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'packageId' }),
    __metadata("design:type", Package)
], ChildInstallment.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Slot, (slot) => slot.childInstallments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'slotId' }),
    __metadata("design:type", Slot)
], ChildInstallment.prototype, "slot", void 0);
exports.ChildInstallment = ChildInstallment = __decorate([
    (0, typeorm_1.Entity)('child_installments'),
    (0, typeorm_1.Index)(['packageId', 'slotId'], { unique: true })
], ChildInstallment);
let InfantInstallment = class InfantInstallment {
    packageId;
    slotId;
    firstInstallment;
    firstInstallmentDueDate;
    secondInstallment;
    secondInstallmentDueDate;
    thirdInstallment;
    thirdInstallmentDueDate;
    createdAt;
    updatedAt;
    package;
    slot;
};
exports.InfantInstallment = InfantInstallment;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], InfantInstallment.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], InfantInstallment.prototype, "slotId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], InfantInstallment.prototype, "firstInstallment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], InfantInstallment.prototype, "firstInstallmentDueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], InfantInstallment.prototype, "secondInstallment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], InfantInstallment.prototype, "secondInstallmentDueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], InfantInstallment.prototype, "thirdInstallment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], InfantInstallment.prototype, "thirdInstallmentDueDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], InfantInstallment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], InfantInstallment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Package, (pkg) => pkg.infantInstallments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'packageId' }),
    __metadata("design:type", Package)
], InfantInstallment.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Slot, (slot) => slot.infantInstallments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'slotId' }),
    __metadata("design:type", Slot)
], InfantInstallment.prototype, "slot", void 0);
exports.InfantInstallment = InfantInstallment = __decorate([
    (0, typeorm_1.Entity)('infant_installments'),
    (0, typeorm_1.Index)(['packageId', 'slotId'], { unique: true })
], InfantInstallment);
let AdultAddon = class AdultAddon {
    packageId;
    slotId;
    type;
    fare;
    createdAt;
    updatedAt;
    package;
    slot;
};
exports.AdultAddon = AdultAddon;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], AdultAddon.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], AdultAddon.prototype, "slotId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AdultAddon.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], AdultAddon.prototype, "fare", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AdultAddon.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AdultAddon.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Package, (pkg) => pkg.adultAddons, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'packageId' }),
    __metadata("design:type", Package)
], AdultAddon.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Slot, (slot) => slot.adultAddons, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'slotId' }),
    __metadata("design:type", Slot)
], AdultAddon.prototype, "slot", void 0);
exports.AdultAddon = AdultAddon = __decorate([
    (0, typeorm_1.Entity)('adult_addons'),
    (0, typeorm_1.Index)(['packageId', 'slotId'], { unique: true })
], AdultAddon);
let ChildAddon = class ChildAddon {
    packageId;
    slotId;
    type;
    fare;
    createdAt;
    updatedAt;
    package;
    slot;
};
exports.ChildAddon = ChildAddon;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ChildAddon.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ChildAddon.prototype, "slotId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ChildAddon.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], ChildAddon.prototype, "fare", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChildAddon.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ChildAddon.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Package, (pkg) => pkg.childAddons, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'packageId' }),
    __metadata("design:type", Package)
], ChildAddon.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Slot, (slot) => slot.childAddons, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'slotId' }),
    __metadata("design:type", Slot)
], ChildAddon.prototype, "slot", void 0);
exports.ChildAddon = ChildAddon = __decorate([
    (0, typeorm_1.Entity)('child_addons'),
    (0, typeorm_1.Index)(['packageId', 'slotId'], { unique: true })
], ChildAddon);
let InfantAddon = class InfantAddon {
    packageId;
    slotId;
    type;
    fare;
    createdAt;
    updatedAt;
    package;
    slot;
};
exports.InfantAddon = InfantAddon;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], InfantAddon.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], InfantAddon.prototype, "slotId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], InfantAddon.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, unsigned: true }),
    __metadata("design:type", Number)
], InfantAddon.prototype, "fare", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], InfantAddon.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], InfantAddon.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Package, (pkg) => pkg.infantAddons, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'packageId' }),
    __metadata("design:type", Package)
], InfantAddon.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Slot, (slot) => slot.infantAddons, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'slotId' }),
    __metadata("design:type", Slot)
], InfantAddon.prototype, "slot", void 0);
exports.InfantAddon = InfantAddon = __decorate([
    (0, typeorm_1.Entity)('infant_addons'),
    (0, typeorm_1.Index)(['packageId', 'slotId'], { unique: true })
], InfantAddon);
//# sourceMappingURL=packages.entity.js.map