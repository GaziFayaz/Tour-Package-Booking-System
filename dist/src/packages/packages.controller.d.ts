import { PackagesService } from './packages.service';
import type { CreatePackageDto, UpdatePackageDto, CreateSlotDto, UpdateSlotDto, CreatePackageFareDto, UpdatePackageFareDto, CreateAdultInstallmentDto, UpdateAdultInstallmentDto, CreateChildInstallmentDto, UpdateChildInstallmentDto, CreateInfantInstallmentDto, UpdateInfantInstallmentDto, CreateAdultAddonDto, UpdateAdultAddonDto, CreateChildAddonDto, UpdateChildAddonDto, CreateInfantAddonDto, UpdateInfantAddonDto, PackagePricingResponseDto } from './packages.dto';
export declare class PackagesController {
    private readonly packagesService;
    constructor(packagesService: PackagesService);
    createPackage(createPackageDto: CreatePackageDto): Promise<import("./packages.entity").Package>;
    findAllPackages(): Promise<import("./packages.entity").Package[]>;
    findPackageById(id: number): Promise<import("./packages.entity").Package>;
    updatePackage(id: number, updatePackageDto: UpdatePackageDto): Promise<import("./packages.entity").Package>;
    removePackage(id: number): Promise<void>;
    getPackagePricing(packageId: number, slotId: number): Promise<PackagePricingResponseDto | null>;
}
export declare class SlotsController {
    private readonly packagesService;
    constructor(packagesService: PackagesService);
    createSlot(createSlotDto: CreateSlotDto): Promise<import("./packages.entity").Slot>;
    findAllSlots(): Promise<import("./packages.entity").Slot[]>;
    findSlotById(id: number): Promise<import("./packages.entity").Slot>;
    updateSlot(id: number, updateSlotDto: UpdateSlotDto): Promise<import("./packages.entity").Slot>;
    removeSlot(id: number): Promise<void>;
}
export declare class PackageFaresController {
    private readonly packagesService;
    constructor(packagesService: PackagesService);
    createPackageFare(createPackageFareDto: CreatePackageFareDto): Promise<import("./packages.entity").PackageFare>;
    findAllPackageFares(): Promise<import("./packages.entity").PackageFare[]>;
    findPackageFareById(packageId: number, slotId: number): Promise<import("./packages.entity").PackageFare>;
    updatePackageFare(packageId: number, slotId: number, updatePackageFareDto: UpdatePackageFareDto): Promise<import("./packages.entity").PackageFare>;
    removePackageFare(packageId: number, slotId: number): Promise<void>;
}
export declare class AdultInstallmentsController {
    private readonly packagesService;
    constructor(packagesService: PackagesService);
    createAdultInstallment(createAdultInstallmentDto: CreateAdultInstallmentDto): Promise<import("./packages.entity").AdultInstallment>;
    findAllAdultInstallments(): Promise<import("./packages.entity").AdultInstallment[]>;
    findAdultInstallmentById(packageId: number, slotId: number): Promise<import("./packages.entity").AdultInstallment>;
    updateAdultInstallment(packageId: number, slotId: number, updateAdultInstallmentDto: UpdateAdultInstallmentDto): Promise<import("./packages.entity").AdultInstallment>;
    removeAdultInstallment(packageId: number, slotId: number): Promise<void>;
}
export declare class ChildInstallmentsController {
    private readonly packagesService;
    constructor(packagesService: PackagesService);
    createChildInstallment(createChildInstallmentDto: CreateChildInstallmentDto): Promise<import("./packages.entity").ChildInstallment>;
    findAllChildInstallments(): Promise<import("./packages.entity").ChildInstallment[]>;
    findChildInstallmentById(packageId: number, slotId: number): Promise<import("./packages.entity").ChildInstallment>;
    updateChildInstallment(packageId: number, slotId: number, updateChildInstallmentDto: UpdateChildInstallmentDto): Promise<import("./packages.entity").ChildInstallment>;
    removeChildInstallment(packageId: number, slotId: number): Promise<void>;
}
export declare class InfantInstallmentsController {
    private readonly packagesService;
    constructor(packagesService: PackagesService);
    createInfantInstallment(createInfantInstallmentDto: CreateInfantInstallmentDto): Promise<import("./packages.entity").InfantInstallment>;
    findAllInfantInstallments(): Promise<import("./packages.entity").InfantInstallment[]>;
    findInfantInstallmentById(packageId: number, slotId: number): Promise<import("./packages.entity").InfantInstallment>;
    updateInfantInstallment(packageId: number, slotId: number, updateInfantInstallmentDto: UpdateInfantInstallmentDto): Promise<import("./packages.entity").InfantInstallment>;
    removeInfantInstallment(packageId: number, slotId: number): Promise<void>;
}
export declare class AdultAddonsController {
    private readonly packagesService;
    constructor(packagesService: PackagesService);
    createAdultAddon(createAdultAddonDto: CreateAdultAddonDto): Promise<import("./packages.entity").AdultAddon>;
    findAllAdultAddons(): Promise<import("./packages.entity").AdultAddon[]>;
    findAdultAddonById(packageId: number, slotId: number): Promise<import("./packages.entity").AdultAddon>;
    updateAdultAddon(packageId: number, slotId: number, updateAdultAddonDto: UpdateAdultAddonDto): Promise<import("./packages.entity").AdultAddon>;
    removeAdultAddon(packageId: number, slotId: number): Promise<void>;
}
export declare class ChildAddonsController {
    private readonly packagesService;
    constructor(packagesService: PackagesService);
    createChildAddon(createChildAddonDto: CreateChildAddonDto): Promise<import("./packages.entity").ChildAddon>;
    findAllChildAddons(): Promise<import("./packages.entity").ChildAddon[]>;
    findChildAddonById(packageId: number, slotId: number): Promise<import("./packages.entity").ChildAddon>;
    updateChildAddon(packageId: number, slotId: number, updateChildAddonDto: UpdateChildAddonDto): Promise<import("./packages.entity").ChildAddon>;
    removeChildAddon(packageId: number, slotId: number): Promise<void>;
}
export declare class InfantAddonsController {
    private readonly packagesService;
    constructor(packagesService: PackagesService);
    createInfantAddon(createInfantAddonDto: CreateInfantAddonDto): Promise<import("./packages.entity").InfantAddon>;
    findAllInfantAddons(): Promise<import("./packages.entity").InfantAddon[]>;
    findInfantAddonById(packageId: number, slotId: number): Promise<import("./packages.entity").InfantAddon>;
    updateInfantAddon(packageId: number, slotId: number, updateInfantAddonDto: UpdateInfantAddonDto): Promise<import("./packages.entity").InfantAddon>;
    removeInfantAddon(packageId: number, slotId: number): Promise<void>;
}
