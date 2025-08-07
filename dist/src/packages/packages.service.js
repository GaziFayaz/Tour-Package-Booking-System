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
exports.PackagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const packages_entity_1 = require("./packages.entity");
let PackagesService = class PackagesService {
    packageRepository;
    slotRepository;
    packageFareRepository;
    adultInstallmentRepository;
    childInstallmentRepository;
    infantInstallmentRepository;
    adultAddonRepository;
    childAddonRepository;
    infantAddonRepository;
    constructor(packageRepository, slotRepository, packageFareRepository, adultInstallmentRepository, childInstallmentRepository, infantInstallmentRepository, adultAddonRepository, childAddonRepository, infantAddonRepository) {
        this.packageRepository = packageRepository;
        this.slotRepository = slotRepository;
        this.packageFareRepository = packageFareRepository;
        this.adultInstallmentRepository = adultInstallmentRepository;
        this.childInstallmentRepository = childInstallmentRepository;
        this.infantInstallmentRepository = infantInstallmentRepository;
        this.adultAddonRepository = adultAddonRepository;
        this.childAddonRepository = childAddonRepository;
        this.infantAddonRepository = infantAddonRepository;
    }
    async createPackage(createPackageDto) {
        const pkg = this.packageRepository.create(createPackageDto);
        return this.packageRepository.save(pkg);
    }
    async findAllPackages() {
        return this.packageRepository.find({
            relations: ['fares', 'adultInstallments', 'childInstallments', 'infantInstallments', 'adultAddons', 'childAddons', 'infantAddons']
        });
    }
    async findPackageById(id) {
        return this.packageRepository.findOne({
            where: { id },
            relations: ['fares', 'adultInstallments', 'childInstallments', 'infantInstallments', 'adultAddons', 'childAddons', 'infantAddons']
        });
    }
    async updatePackage(id, updatePackageDto) {
        await this.packageRepository.update(id, updatePackageDto);
        return this.findPackageById(id);
    }
    async removePackage(id) {
        const result = await this.packageRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Package with ID ${id} not found`);
        }
    }
    async createSlot(createSlotDto) {
        const slot = this.slotRepository.create(createSlotDto);
        return this.slotRepository.save(slot);
    }
    async findAllSlots() {
        return this.slotRepository.find({
            relations: ['fares', 'adultInstallments', 'childInstallments', 'infantInstallments', 'adultAddons', 'childAddons', 'infantAddons']
        });
    }
    async findSlotById(id) {
        return this.slotRepository.findOne({
            where: { id },
            relations: ['fares', 'adultInstallments', 'childInstallments', 'infantInstallments', 'adultAddons', 'childAddons', 'infantAddons']
        });
    }
    async updateSlot(id, updateSlotDto) {
        await this.slotRepository.update(id, updateSlotDto);
        return this.findSlotById(id);
    }
    async removeSlot(id) {
        const result = await this.slotRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Slot with ID ${id} not found`);
        }
    }
    async createPackageFare(createPackageFareDto) {
        const packageFare = this.packageFareRepository.create(createPackageFareDto);
        return this.packageFareRepository.save(packageFare);
    }
    async findAllPackageFares() {
        return this.packageFareRepository.find({
            relations: ['package', 'slot']
        });
    }
    async findPackageFareById(packageId, slotId) {
        return this.packageFareRepository.findOne({
            where: { packageId, slotId },
            relations: ['package', 'slot']
        });
    }
    async updatePackageFare(packageId, slotId, updatePackageFareDto) {
        await this.packageFareRepository.update({ packageId, slotId }, updatePackageFareDto);
        return this.findPackageFareById(packageId, slotId);
    }
    async removePackageFare(packageId, slotId) {
        const result = await this.packageFareRepository.delete({ packageId, slotId });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Package fare with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
    }
    async createAdultInstallment(createAdultInstallmentDto) {
        const installment = this.adultInstallmentRepository.create(createAdultInstallmentDto);
        return this.adultInstallmentRepository.save(installment);
    }
    async findAllAdultInstallments() {
        return this.adultInstallmentRepository.find({
            relations: ['package', 'slot']
        });
    }
    async findAdultInstallmentById(packageId, slotId) {
        return this.adultInstallmentRepository.findOne({
            where: { packageId, slotId },
            relations: ['package', 'slot']
        });
    }
    async updateAdultInstallment(packageId, slotId, updateAdultInstallmentDto) {
        await this.adultInstallmentRepository.update({ packageId, slotId }, updateAdultInstallmentDto);
        return this.findAdultInstallmentById(packageId, slotId);
    }
    async removeAdultInstallment(packageId, slotId) {
        const result = await this.adultInstallmentRepository.delete({ packageId, slotId });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Adult installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
    }
    async createChildInstallment(createChildInstallmentDto) {
        const installment = this.childInstallmentRepository.create(createChildInstallmentDto);
        return this.childInstallmentRepository.save(installment);
    }
    async findAllChildInstallments() {
        return this.childInstallmentRepository.find({
            relations: ['package', 'slot']
        });
    }
    async findChildInstallmentById(packageId, slotId) {
        return this.childInstallmentRepository.findOne({
            where: { packageId, slotId },
            relations: ['package', 'slot']
        });
    }
    async updateChildInstallment(packageId, slotId, updateChildInstallmentDto) {
        await this.childInstallmentRepository.update({ packageId, slotId }, updateChildInstallmentDto);
        return this.findChildInstallmentById(packageId, slotId);
    }
    async removeChildInstallment(packageId, slotId) {
        const result = await this.childInstallmentRepository.delete({ packageId, slotId });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Child installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
    }
    async createInfantInstallment(createInfantInstallmentDto) {
        const installment = this.infantInstallmentRepository.create(createInfantInstallmentDto);
        return this.infantInstallmentRepository.save(installment);
    }
    async findAllInfantInstallments() {
        return this.infantInstallmentRepository.find({
            relations: ['package', 'slot']
        });
    }
    async findInfantInstallmentById(packageId, slotId) {
        return this.infantInstallmentRepository.findOne({
            where: { packageId, slotId },
            relations: ['package', 'slot']
        });
    }
    async updateInfantInstallment(packageId, slotId, updateInfantInstallmentDto) {
        await this.infantInstallmentRepository.update({ packageId, slotId }, updateInfantInstallmentDto);
        return this.findInfantInstallmentById(packageId, slotId);
    }
    async removeInfantInstallment(packageId, slotId) {
        const result = await this.infantInstallmentRepository.delete({ packageId, slotId });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Infant installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
    }
    async createAdultAddon(createAdultAddonDto) {
        const addon = this.adultAddonRepository.create(createAdultAddonDto);
        return this.adultAddonRepository.save(addon);
    }
    async findAllAdultAddons() {
        return this.adultAddonRepository.find({
            relations: ['package', 'slot']
        });
    }
    async findAdultAddonById(packageId, slotId) {
        return this.adultAddonRepository.findOne({
            where: { packageId, slotId },
            relations: ['package', 'slot']
        });
    }
    async updateAdultAddon(packageId, slotId, updateAdultAddonDto) {
        await this.adultAddonRepository.update({ packageId, slotId }, updateAdultAddonDto);
        return this.findAdultAddonById(packageId, slotId);
    }
    async removeAdultAddon(packageId, slotId) {
        const result = await this.adultAddonRepository.delete({ packageId, slotId });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Adult addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
    }
    async createChildAddon(createChildAddonDto) {
        const addon = this.childAddonRepository.create(createChildAddonDto);
        return this.childAddonRepository.save(addon);
    }
    async findAllChildAddons() {
        return this.childAddonRepository.find({
            relations: ['package', 'slot']
        });
    }
    async findChildAddonById(packageId, slotId) {
        return this.childAddonRepository.findOne({
            where: { packageId, slotId },
            relations: ['package', 'slot']
        });
    }
    async updateChildAddon(packageId, slotId, updateChildAddonDto) {
        await this.childAddonRepository.update({ packageId, slotId }, updateChildAddonDto);
        return this.findChildAddonById(packageId, slotId);
    }
    async removeChildAddon(packageId, slotId) {
        const result = await this.childAddonRepository.delete({ packageId, slotId });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Child addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
    }
    async createInfantAddon(createInfantAddonDto) {
        const addon = this.infantAddonRepository.create(createInfantAddonDto);
        return this.infantAddonRepository.save(addon);
    }
    async findAllInfantAddons() {
        return this.infantAddonRepository.find({
            relations: ['package', 'slot']
        });
    }
    async findInfantAddonById(packageId, slotId) {
        return this.infantAddonRepository.findOne({
            where: { packageId, slotId },
            relations: ['package', 'slot']
        });
    }
    async updateInfantAddon(packageId, slotId, updateInfantAddonDto) {
        await this.infantAddonRepository.update({ packageId, slotId }, updateInfantAddonDto);
        return this.findInfantAddonById(packageId, slotId);
    }
    async removeInfantAddon(packageId, slotId) {
        const result = await this.infantAddonRepository.delete({ packageId, slotId });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Infant addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
        }
    }
    async getPackagePricing(packageId, slotId) {
        const packageEntity = await this.packageRepository.findOne({ where: { id: packageId } });
        const slotEntity = await this.slotRepository.findOne({ where: { id: slotId } });
        if (!packageEntity || !slotEntity) {
            throw new common_1.NotFoundException(`Package with ID ${packageId} ${!packageEntity ? 'not found' : ''} ${!packageEntity && !slotEntity ? 'and' : ''} Slot with ID ${slotId} ${!slotEntity ? 'not found' : ''}`);
        }
        const packageFare = await this.packageFareRepository.findOne({
            where: { packageId, slotId }
        });
        if (!packageFare) {
            throw new common_1.NotFoundException(`No fare found for Package ID ${packageId} and Slot ID ${slotId}`);
        }
        const [adultInstallment, childInstallment, infantInstallment] = await Promise.all([
            this.adultInstallmentRepository.findOne({ where: { packageId, slotId } }),
            this.childInstallmentRepository.findOne({ where: { packageId, slotId } }),
            this.infantInstallmentRepository.findOne({ where: { packageId, slotId } })
        ]);
        const response = {
            packageId,
            slotId,
            packageName: packageEntity.name,
            slotName: slotEntity.name,
            fares: {
                adult: Number(packageFare.adultFare),
                child: Number(packageFare.childFare),
                infant: Number(packageFare.infantFare)
            },
            installments: {
                adult: adultInstallment ? {
                    firstInstallment: Number(adultInstallment.firstInstallment),
                    firstInstallmentDueDate: adultInstallment.firstInstallmentDueDate,
                    secondInstallment: Number(adultInstallment.secondInstallment),
                    secondInstallmentDueDate: adultInstallment.secondInstallmentDueDate,
                    thirdInstallment: Number(adultInstallment.thirdInstallment),
                    thirdInstallmentDueDate: adultInstallment.thirdInstallmentDueDate,
                    totalAmount: Number(adultInstallment.firstInstallment) + Number(adultInstallment.secondInstallment) + Number(adultInstallment.thirdInstallment)
                } : null,
                child: childInstallment ? {
                    firstInstallment: Number(childInstallment.firstInstallment),
                    firstInstallmentDueDate: childInstallment.firstInstallmentDueDate,
                    secondInstallment: Number(childInstallment.secondInstallment),
                    secondInstallmentDueDate: childInstallment.secondInstallmentDueDate,
                    thirdInstallment: Number(childInstallment.thirdInstallment),
                    thirdInstallmentDueDate: childInstallment.thirdInstallmentDueDate,
                    totalAmount: Number(childInstallment.firstInstallment) + Number(childInstallment.secondInstallment) + Number(childInstallment.thirdInstallment)
                } : null,
                infant: infantInstallment ? {
                    firstInstallment: Number(infantInstallment.firstInstallment),
                    firstInstallmentDueDate: infantInstallment.firstInstallmentDueDate,
                    secondInstallment: Number(infantInstallment.secondInstallment),
                    secondInstallmentDueDate: infantInstallment.secondInstallmentDueDate,
                    thirdInstallment: Number(infantInstallment.thirdInstallment),
                    thirdInstallmentDueDate: infantInstallment.thirdInstallmentDueDate,
                    totalAmount: Number(infantInstallment.firstInstallment) + Number(infantInstallment.secondInstallment) + Number(infantInstallment.thirdInstallment)
                } : null
            },
            createdAt: packageFare.createdAt,
            updatedAt: packageFare.updatedAt
        };
        return response;
    }
};
exports.PackagesService = PackagesService;
exports.PackagesService = PackagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(packages_entity_1.Package)),
    __param(1, (0, typeorm_1.InjectRepository)(packages_entity_1.Slot)),
    __param(2, (0, typeorm_1.InjectRepository)(packages_entity_1.PackageFare)),
    __param(3, (0, typeorm_1.InjectRepository)(packages_entity_1.AdultInstallment)),
    __param(4, (0, typeorm_1.InjectRepository)(packages_entity_1.ChildInstallment)),
    __param(5, (0, typeorm_1.InjectRepository)(packages_entity_1.InfantInstallment)),
    __param(6, (0, typeorm_1.InjectRepository)(packages_entity_1.AdultAddon)),
    __param(7, (0, typeorm_1.InjectRepository)(packages_entity_1.ChildAddon)),
    __param(8, (0, typeorm_1.InjectRepository)(packages_entity_1.InfantAddon)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PackagesService);
//# sourceMappingURL=packages.service.js.map