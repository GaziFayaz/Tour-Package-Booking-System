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
exports.InfantAddonsController = exports.ChildAddonsController = exports.AdultAddonsController = exports.InfantInstallmentsController = exports.ChildInstallmentsController = exports.AdultInstallmentsController = exports.PackageFaresController = exports.SlotsController = exports.PackagesController = void 0;
const common_1 = require("@nestjs/common");
const packages_service_1 = require("./packages.service");
let PackagesController = class PackagesController {
    packagesService;
    constructor(packagesService) {
        this.packagesService = packagesService;
    }
    createPackage(createPackageDto) {
        return this.packagesService.createPackage(createPackageDto);
    }
    findAllPackages() {
        return this.packagesService.findAllPackages();
    }
    async findPackageById(id) {
        const pkg = await this.packagesService.findPackageById(id);
        if (!pkg) {
            throw new common_1.NotFoundException(`Package with ID ${id} not found`);
        }
        return pkg;
    }
    async updatePackage(id, updatePackageDto) {
        const pkg = await this.packagesService.updatePackage(id, updatePackageDto);
        if (!pkg) {
            throw new common_1.NotFoundException(`Package with ID ${id} not found`);
        }
        return pkg;
    }
    removePackage(id) {
        return this.packagesService.removePackage(id);
    }
    async getPackagePricing(packageId, slotId) {
        return this.packagesService.getPackagePricing(packageId, slotId);
    }
};
exports.PackagesController = PackagesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "createPackage", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "findAllPackages", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "findPackageById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "updatePackage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "removePackage", null);
__decorate([
    (0, common_1.Get)(':packageId/slots/:slotId/pricing'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "getPackagePricing", null);
exports.PackagesController = PackagesController = __decorate([
    (0, common_1.Controller)('packages'),
    __metadata("design:paramtypes", [packages_service_1.PackagesService])
], PackagesController);
let SlotsController = class SlotsController {
    packagesService;
    constructor(packagesService) {
        this.packagesService = packagesService;
    }
    createSlot(createSlotDto) {
        return this.packagesService.createSlot(createSlotDto);
    }
    findAllSlots() {
        return this.packagesService.findAllSlots();
    }
    async findSlotById(id) {
        const slot = await this.packagesService.findSlotById(id);
        if (!slot) {
            throw new common_1.NotFoundException(`Slot with ID ${id} not found`);
        }
        return slot;
    }
    async updateSlot(id, updateSlotDto) {
        const slot = await this.packagesService.updateSlot(id, updateSlotDto);
        if (!slot) {
            throw new common_1.NotFoundException(`Slot with ID ${id} not found`);
        }
        return slot;
    }
    removeSlot(id) {
        return this.packagesService.removeSlot(id);
    }
};
exports.SlotsController = SlotsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SlotsController.prototype, "createSlot", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SlotsController.prototype, "findAllSlots", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SlotsController.prototype, "findSlotById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SlotsController.prototype, "updateSlot", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SlotsController.prototype, "removeSlot", null);
exports.SlotsController = SlotsController = __decorate([
    (0, common_1.Controller)('slots'),
    __metadata("design:paramtypes", [packages_service_1.PackagesService])
], SlotsController);
let PackageFaresController = class PackageFaresController {
    packagesService;
    constructor(packagesService) {
        this.packagesService = packagesService;
    }
    createPackageFare(createPackageFareDto) {
        return this.packagesService.createPackageFare(createPackageFareDto);
    }
    findAllPackageFares() {
        return this.packagesService.findAllPackageFares();
    }
    async findPackageFareById(packageId, slotId) {
        const fare = await this.packagesService.findPackageFareById(packageId, slotId);
        if (!fare) {
            throw new common_1.NotFoundException(`Package fare with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
        return fare;
    }
    async updatePackageFare(packageId, slotId, updatePackageFareDto) {
        const fare = await this.packagesService.updatePackageFare(packageId, slotId, updatePackageFareDto);
        if (!fare) {
            throw new common_1.NotFoundException(`Package fare with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
        return fare;
    }
    removePackageFare(packageId, slotId) {
        return this.packagesService.removePackageFare(packageId, slotId);
    }
};
exports.PackageFaresController = PackageFaresController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PackageFaresController.prototype, "createPackageFare", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PackageFaresController.prototype, "findAllPackageFares", null);
__decorate([
    (0, common_1.Get)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PackageFaresController.prototype, "findPackageFareById", null);
__decorate([
    (0, common_1.Patch)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PackageFaresController.prototype, "updatePackageFare", null);
__decorate([
    (0, common_1.Delete)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PackageFaresController.prototype, "removePackageFare", null);
exports.PackageFaresController = PackageFaresController = __decorate([
    (0, common_1.Controller)('package-fares'),
    __metadata("design:paramtypes", [packages_service_1.PackagesService])
], PackageFaresController);
let AdultInstallmentsController = class AdultInstallmentsController {
    packagesService;
    constructor(packagesService) {
        this.packagesService = packagesService;
    }
    createAdultInstallment(createAdultInstallmentDto) {
        return this.packagesService.createAdultInstallment(createAdultInstallmentDto);
    }
    findAllAdultInstallments() {
        return this.packagesService.findAllAdultInstallments();
    }
    async findAdultInstallmentById(packageId, slotId) {
        const installment = await this.packagesService.findAdultInstallmentById(packageId, slotId);
        if (!installment) {
            throw new common_1.NotFoundException(`Adult installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
        return installment;
    }
    async updateAdultInstallment(packageId, slotId, updateAdultInstallmentDto) {
        const installment = await this.packagesService.updateAdultInstallment(packageId, slotId, updateAdultInstallmentDto);
        if (!installment) {
            throw new common_1.NotFoundException(`Adult installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
        return installment;
    }
    removeAdultInstallment(packageId, slotId) {
        return this.packagesService.removeAdultInstallment(packageId, slotId);
    }
};
exports.AdultInstallmentsController = AdultInstallmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdultInstallmentsController.prototype, "createAdultInstallment", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdultInstallmentsController.prototype, "findAllAdultInstallments", null);
__decorate([
    (0, common_1.Get)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdultInstallmentsController.prototype, "findAdultInstallmentById", null);
__decorate([
    (0, common_1.Patch)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdultInstallmentsController.prototype, "updateAdultInstallment", null);
__decorate([
    (0, common_1.Delete)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AdultInstallmentsController.prototype, "removeAdultInstallment", null);
exports.AdultInstallmentsController = AdultInstallmentsController = __decorate([
    (0, common_1.Controller)('adult-installments'),
    __metadata("design:paramtypes", [packages_service_1.PackagesService])
], AdultInstallmentsController);
let ChildInstallmentsController = class ChildInstallmentsController {
    packagesService;
    constructor(packagesService) {
        this.packagesService = packagesService;
    }
    createChildInstallment(createChildInstallmentDto) {
        return this.packagesService.createChildInstallment(createChildInstallmentDto);
    }
    findAllChildInstallments() {
        return this.packagesService.findAllChildInstallments();
    }
    async findChildInstallmentById(packageId, slotId) {
        const installment = await this.packagesService.findChildInstallmentById(packageId, slotId);
        if (!installment) {
            throw new common_1.NotFoundException(`Child installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
        return installment;
    }
    async updateChildInstallment(packageId, slotId, updateChildInstallmentDto) {
        const installment = await this.packagesService.updateChildInstallment(packageId, slotId, updateChildInstallmentDto);
        if (!installment) {
            throw new common_1.NotFoundException(`Child installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
        return installment;
    }
    removeChildInstallment(packageId, slotId) {
        return this.packagesService.removeChildInstallment(packageId, slotId);
    }
};
exports.ChildInstallmentsController = ChildInstallmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChildInstallmentsController.prototype, "createChildInstallment", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChildInstallmentsController.prototype, "findAllChildInstallments", null);
__decorate([
    (0, common_1.Get)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ChildInstallmentsController.prototype, "findChildInstallmentById", null);
__decorate([
    (0, common_1.Patch)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ChildInstallmentsController.prototype, "updateChildInstallment", null);
__decorate([
    (0, common_1.Delete)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ChildInstallmentsController.prototype, "removeChildInstallment", null);
exports.ChildInstallmentsController = ChildInstallmentsController = __decorate([
    (0, common_1.Controller)('child-installments'),
    __metadata("design:paramtypes", [packages_service_1.PackagesService])
], ChildInstallmentsController);
let InfantInstallmentsController = class InfantInstallmentsController {
    packagesService;
    constructor(packagesService) {
        this.packagesService = packagesService;
    }
    createInfantInstallment(createInfantInstallmentDto) {
        return this.packagesService.createInfantInstallment(createInfantInstallmentDto);
    }
    findAllInfantInstallments() {
        return this.packagesService.findAllInfantInstallments();
    }
    async findInfantInstallmentById(packageId, slotId) {
        const installment = await this.packagesService.findInfantInstallmentById(packageId, slotId);
        if (!installment) {
            throw new common_1.NotFoundException(`Infant installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
        return installment;
    }
    async updateInfantInstallment(packageId, slotId, updateInfantInstallmentDto) {
        const installment = await this.packagesService.updateInfantInstallment(packageId, slotId, updateInfantInstallmentDto);
        if (!installment) {
            throw new common_1.NotFoundException(`Infant installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
        return installment;
    }
    removeInfantInstallment(packageId, slotId) {
        return this.packagesService.removeInfantInstallment(packageId, slotId);
    }
};
exports.InfantInstallmentsController = InfantInstallmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InfantInstallmentsController.prototype, "createInfantInstallment", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InfantInstallmentsController.prototype, "findAllInfantInstallments", null);
__decorate([
    (0, common_1.Get)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], InfantInstallmentsController.prototype, "findInfantInstallmentById", null);
__decorate([
    (0, common_1.Patch)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], InfantInstallmentsController.prototype, "updateInfantInstallment", null);
__decorate([
    (0, common_1.Delete)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], InfantInstallmentsController.prototype, "removeInfantInstallment", null);
exports.InfantInstallmentsController = InfantInstallmentsController = __decorate([
    (0, common_1.Controller)('infant-installments'),
    __metadata("design:paramtypes", [packages_service_1.PackagesService])
], InfantInstallmentsController);
let AdultAddonsController = class AdultAddonsController {
    packagesService;
    constructor(packagesService) {
        this.packagesService = packagesService;
    }
    createAdultAddon(createAdultAddonDto) {
        return this.packagesService.createAdultAddon(createAdultAddonDto);
    }
    findAllAdultAddons() {
        return this.packagesService.findAllAdultAddons();
    }
    async findAdultAddonById(packageId, slotId) {
        const addon = await this.packagesService.findAdultAddonById(packageId, slotId);
        if (!addon) {
            throw new common_1.NotFoundException(`Adult addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
        return addon;
    }
    async updateAdultAddon(packageId, slotId, updateAdultAddonDto) {
        const addon = await this.packagesService.updateAdultAddon(packageId, slotId, updateAdultAddonDto);
        if (!addon) {
            throw new common_1.NotFoundException(`Adult addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
        return addon;
    }
    removeAdultAddon(packageId, slotId) {
        return this.packagesService.removeAdultAddon(packageId, slotId);
    }
};
exports.AdultAddonsController = AdultAddonsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdultAddonsController.prototype, "createAdultAddon", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdultAddonsController.prototype, "findAllAdultAddons", null);
__decorate([
    (0, common_1.Get)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdultAddonsController.prototype, "findAdultAddonById", null);
__decorate([
    (0, common_1.Patch)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdultAddonsController.prototype, "updateAdultAddon", null);
__decorate([
    (0, common_1.Delete)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AdultAddonsController.prototype, "removeAdultAddon", null);
exports.AdultAddonsController = AdultAddonsController = __decorate([
    (0, common_1.Controller)('adult-addons'),
    __metadata("design:paramtypes", [packages_service_1.PackagesService])
], AdultAddonsController);
let ChildAddonsController = class ChildAddonsController {
    packagesService;
    constructor(packagesService) {
        this.packagesService = packagesService;
    }
    createChildAddon(createChildAddonDto) {
        return this.packagesService.createChildAddon(createChildAddonDto);
    }
    findAllChildAddons() {
        return this.packagesService.findAllChildAddons();
    }
    async findChildAddonById(packageId, slotId) {
        const addon = await this.packagesService.findChildAddonById(packageId, slotId);
        if (!addon) {
            throw new common_1.NotFoundException(`Child addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
        return addon;
    }
    async updateChildAddon(packageId, slotId, updateChildAddonDto) {
        const addon = await this.packagesService.updateChildAddon(packageId, slotId, updateChildAddonDto);
        if (!addon) {
            throw new common_1.NotFoundException(`Child addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
        return addon;
    }
    removeChildAddon(packageId, slotId) {
        return this.packagesService.removeChildAddon(packageId, slotId);
    }
};
exports.ChildAddonsController = ChildAddonsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChildAddonsController.prototype, "createChildAddon", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChildAddonsController.prototype, "findAllChildAddons", null);
__decorate([
    (0, common_1.Get)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ChildAddonsController.prototype, "findChildAddonById", null);
__decorate([
    (0, common_1.Patch)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ChildAddonsController.prototype, "updateChildAddon", null);
__decorate([
    (0, common_1.Delete)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ChildAddonsController.prototype, "removeChildAddon", null);
exports.ChildAddonsController = ChildAddonsController = __decorate([
    (0, common_1.Controller)('child-addons'),
    __metadata("design:paramtypes", [packages_service_1.PackagesService])
], ChildAddonsController);
let InfantAddonsController = class InfantAddonsController {
    packagesService;
    constructor(packagesService) {
        this.packagesService = packagesService;
    }
    createInfantAddon(createInfantAddonDto) {
        return this.packagesService.createInfantAddon(createInfantAddonDto);
    }
    findAllInfantAddons() {
        return this.packagesService.findAllInfantAddons();
    }
    async findInfantAddonById(packageId, slotId) {
        const addon = await this.packagesService.findInfantAddonById(packageId, slotId);
        if (!addon) {
            throw new common_1.NotFoundException(`Infant addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
        return addon;
    }
    async updateInfantAddon(packageId, slotId, updateInfantAddonDto) {
        const addon = await this.packagesService.updateInfantAddon(packageId, slotId, updateInfantAddonDto);
        if (!addon) {
            throw new common_1.NotFoundException(`Infant addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
        return addon;
    }
    removeInfantAddon(packageId, slotId) {
        return this.packagesService.removeInfantAddon(packageId, slotId);
    }
};
exports.InfantAddonsController = InfantAddonsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InfantAddonsController.prototype, "createInfantAddon", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InfantAddonsController.prototype, "findAllInfantAddons", null);
__decorate([
    (0, common_1.Get)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], InfantAddonsController.prototype, "findInfantAddonById", null);
__decorate([
    (0, common_1.Patch)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], InfantAddonsController.prototype, "updateInfantAddon", null);
__decorate([
    (0, common_1.Delete)(':packageId/:slotId'),
    __param(0, (0, common_1.Param)('packageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slotId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], InfantAddonsController.prototype, "removeInfantAddon", null);
exports.InfantAddonsController = InfantAddonsController = __decorate([
    (0, common_1.Controller)('infant-addons'),
    __metadata("design:paramtypes", [packages_service_1.PackagesService])
], InfantAddonsController);
//# sourceMappingURL=packages.controller.js.map