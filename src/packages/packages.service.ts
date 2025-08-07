import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  Package, 
  Slot, 
  PackageFare, 
  AdultInstallment, 
  ChildInstallment, 
  InfantInstallment,
  AdultAddon,
  ChildAddon,
  InfantAddon
} from './packages.entity';
import type {
  CreatePackageDto,
  UpdatePackageDto,
  CreateSlotDto,
  UpdateSlotDto,
  CreatePackageFareDto,
  UpdatePackageFareDto,
  CreateAdultInstallmentDto,
  UpdateAdultInstallmentDto,
  CreateChildInstallmentDto,
  UpdateChildInstallmentDto,
  CreateInfantInstallmentDto,
  UpdateInfantInstallmentDto,
  CreateAdultAddonDto,
  UpdateAdultAddonDto,
  CreateChildAddonDto,
  UpdateChildAddonDto,
  CreateInfantAddonDto,
  UpdateInfantAddonDto,
  PackagePricingResponseDto
} from './packages.dto';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
    @InjectRepository(Slot)
    private readonly slotRepository: Repository<Slot>,
    @InjectRepository(PackageFare)
    private readonly packageFareRepository: Repository<PackageFare>,
    @InjectRepository(AdultInstallment)
    private readonly adultInstallmentRepository: Repository<AdultInstallment>,
    @InjectRepository(ChildInstallment)
    private readonly childInstallmentRepository: Repository<ChildInstallment>,
    @InjectRepository(InfantInstallment)
    private readonly infantInstallmentRepository: Repository<InfantInstallment>,
    @InjectRepository(AdultAddon)
    private readonly adultAddonRepository: Repository<AdultAddon>,
    @InjectRepository(ChildAddon)
    private readonly childAddonRepository: Repository<ChildAddon>,
    @InjectRepository(InfantAddon)
    private readonly infantAddonRepository: Repository<InfantAddon>,
  ) {}

  // =================== PACKAGE METHODS ===================
  async createPackage(createPackageDto: CreatePackageDto): Promise<Package> {
    const pkg = this.packageRepository.create(createPackageDto);
    return this.packageRepository.save(pkg);
  }

  async findAllPackages(): Promise<Package[]> {
    return this.packageRepository.find({
      relations: ['fares', 'adultInstallments', 'childInstallments', 'infantInstallments', 'adultAddons', 'childAddons', 'infantAddons']
    });
  }

  async findPackageById(id: number): Promise<Package | null> {
    return this.packageRepository.findOne({
      where: { id },
      relations: ['fares', 'adultInstallments', 'childInstallments', 'infantInstallments', 'adultAddons', 'childAddons', 'infantAddons']
    });
  }

  async updatePackage(id: number, updatePackageDto: UpdatePackageDto): Promise<Package | null> {
    await this.packageRepository.update(id, updatePackageDto);
    return this.findPackageById(id);
  }

  async removePackage(id: number): Promise<void> {
    const result = await this.packageRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
  }

  // =================== SLOT METHODS ===================
  async createSlot(createSlotDto: CreateSlotDto): Promise<Slot> {
    const slot = this.slotRepository.create(createSlotDto);
    return this.slotRepository.save(slot);
  }

  async findAllSlots(): Promise<Slot[]> {
    return this.slotRepository.find({
      relations: ['fares', 'adultInstallments', 'childInstallments', 'infantInstallments', 'adultAddons', 'childAddons', 'infantAddons']
    });
  }

  async findSlotById(id: number): Promise<Slot | null> {
    return this.slotRepository.findOne({
      where: { id },
      relations: ['fares', 'adultInstallments', 'childInstallments', 'infantInstallments', 'adultAddons', 'childAddons', 'infantAddons']
    });
  }

  async updateSlot(id: number, updateSlotDto: UpdateSlotDto): Promise<Slot | null> {
    await this.slotRepository.update(id, updateSlotDto);
    return this.findSlotById(id);
  }

  async removeSlot(id: number): Promise<void> {
    const result = await this.slotRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Slot with ID ${id} not found`);
    }
  }

  // =================== PACKAGE FARE METHODS ===================
  async createPackageFare(createPackageFareDto: CreatePackageFareDto): Promise<PackageFare> {
    const packageFare = this.packageFareRepository.create(createPackageFareDto);
    return this.packageFareRepository.save(packageFare);
  }

  async findAllPackageFares(): Promise<PackageFare[]> {
    return this.packageFareRepository.find({
      relations: ['package', 'slot']
    });
  }

  async findPackageFareById(packageId: number, slotId: number): Promise<PackageFare | null> {
    return this.packageFareRepository.findOne({
      where: { packageId, slotId },
      relations: ['package', 'slot']
    });
  }

  async updatePackageFare(
    packageId: number,
    slotId: number,
    updatePackageFareDto: UpdatePackageFareDto
  ): Promise<PackageFare | null> {
    await this.packageFareRepository.update({ packageId, slotId }, updatePackageFareDto);
    return this.findPackageFareById(packageId, slotId);
  }

  async removePackageFare(packageId: number, slotId: number): Promise<void> {
    const result = await this.packageFareRepository.delete({ packageId, slotId });
    if (result.affected === 0) {
      throw new NotFoundException(`Package fare with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
  }

  // =================== ADULT INSTALLMENT METHODS ===================
  async createAdultInstallment(createAdultInstallmentDto: CreateAdultInstallmentDto): Promise<AdultInstallment> {
    const installment = this.adultInstallmentRepository.create(createAdultInstallmentDto);
    return this.adultInstallmentRepository.save(installment);
  }

  async findAllAdultInstallments(): Promise<AdultInstallment[]> {
    return this.adultInstallmentRepository.find({
      relations: ['package', 'slot']
    });
  }

  async findAdultInstallmentById(packageId: number, slotId: number): Promise<AdultInstallment | null> {
    return this.adultInstallmentRepository.findOne({
      where: { packageId, slotId },
      relations: ['package', 'slot']
    });
  }

  async updateAdultInstallment(
    packageId: number,
    slotId: number,
    updateAdultInstallmentDto: UpdateAdultInstallmentDto
  ): Promise<AdultInstallment | null> {
    await this.adultInstallmentRepository.update({ packageId, slotId }, updateAdultInstallmentDto);
    return this.findAdultInstallmentById(packageId, slotId);
  }

  async removeAdultInstallment(packageId: number, slotId: number): Promise<void> {
    const result = await this.adultInstallmentRepository.delete({ packageId, slotId });
    if (result.affected === 0) {
      throw new NotFoundException(`Adult installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
  }

  // =================== CHILD INSTALLMENT METHODS ===================
  async createChildInstallment(createChildInstallmentDto: CreateChildInstallmentDto): Promise<ChildInstallment> {
    const installment = this.childInstallmentRepository.create(createChildInstallmentDto);
    return this.childInstallmentRepository.save(installment);
  }

  async findAllChildInstallments(): Promise<ChildInstallment[]> {
    return this.childInstallmentRepository.find({
      relations: ['package', 'slot']
    });
  }

  async findChildInstallmentById(packageId: number, slotId: number): Promise<ChildInstallment | null> {
    return this.childInstallmentRepository.findOne({
      where: { packageId, slotId },
      relations: ['package', 'slot']
    });
  }

  async updateChildInstallment(
    packageId: number,
    slotId: number,
    updateChildInstallmentDto: UpdateChildInstallmentDto
  ): Promise<ChildInstallment | null> {
    await this.childInstallmentRepository.update({ packageId, slotId }, updateChildInstallmentDto);
    return this.findChildInstallmentById(packageId, slotId);
  }

  async removeChildInstallment(packageId: number, slotId: number): Promise<void> {
    const result = await this.childInstallmentRepository.delete({ packageId, slotId });
    if (result.affected === 0) {
      throw new NotFoundException(`Child installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
  }

  // =================== INFANT INSTALLMENT METHODS ===================
  async createInfantInstallment(createInfantInstallmentDto: CreateInfantInstallmentDto): Promise<InfantInstallment> {
    const installment = this.infantInstallmentRepository.create(createInfantInstallmentDto);
    return this.infantInstallmentRepository.save(installment);
  }

  async findAllInfantInstallments(): Promise<InfantInstallment[]> {
    return this.infantInstallmentRepository.find({
      relations: ['package', 'slot']
    });
  }

  async findInfantInstallmentById(packageId: number, slotId: number): Promise<InfantInstallment | null> {
    return this.infantInstallmentRepository.findOne({
      where: { packageId, slotId },
      relations: ['package', 'slot']
    });
  }

  async updateInfantInstallment(
    packageId: number,
    slotId: number,
    updateInfantInstallmentDto: UpdateInfantInstallmentDto
  ): Promise<InfantInstallment | null> {
    await this.infantInstallmentRepository.update({ packageId, slotId }, updateInfantInstallmentDto);
    return this.findInfantInstallmentById(packageId, slotId);
  }

  async removeInfantInstallment(packageId: number, slotId: number): Promise<void> {
    const result = await this.infantInstallmentRepository.delete({ packageId, slotId });
    if (result.affected === 0) {
      throw new NotFoundException(`Infant installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
  }

  // =================== ADULT ADDON METHODS ===================
  async createAdultAddon(createAdultAddonDto: CreateAdultAddonDto): Promise<AdultAddon> {
    const addon = this.adultAddonRepository.create(createAdultAddonDto);
    return this.adultAddonRepository.save(addon);
  }

  async findAllAdultAddons(): Promise<AdultAddon[]> {
    return this.adultAddonRepository.find({
      relations: ['package', 'slot']
    });
  }

  async findAdultAddonById(packageId: number, slotId: number): Promise<AdultAddon | null> {
    return this.adultAddonRepository.findOne({
      where: { packageId, slotId },
      relations: ['package', 'slot']
    });
  }

  async updateAdultAddon(
    packageId: number,
    slotId: number,
    updateAdultAddonDto: UpdateAdultAddonDto
  ): Promise<AdultAddon | null> {
    await this.adultAddonRepository.update({ packageId, slotId }, updateAdultAddonDto);
    return this.findAdultAddonById(packageId, slotId);
  }

  async removeAdultAddon(packageId: number, slotId: number): Promise<void> {
    const result = await this.adultAddonRepository.delete({ packageId, slotId });
    if (result.affected === 0) {
      throw new NotFoundException(`Adult addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
  }

  // =================== CHILD ADDON METHODS ===================
  async createChildAddon(createChildAddonDto: CreateChildAddonDto): Promise<ChildAddon> {
    const addon = this.childAddonRepository.create(createChildAddonDto);
    return this.childAddonRepository.save(addon);
  }

  async findAllChildAddons(): Promise<ChildAddon[]> {
    return this.childAddonRepository.find({
      relations: ['package', 'slot']
    });
  }

  async findChildAddonById(packageId: number, slotId: number): Promise<ChildAddon | null> {
    return this.childAddonRepository.findOne({
      where: { packageId, slotId },
      relations: ['package', 'slot']
    });
  }

  async updateChildAddon(
    packageId: number,
    slotId: number,
    updateChildAddonDto: UpdateChildAddonDto
  ): Promise<ChildAddon | null> {
    await this.childAddonRepository.update({ packageId, slotId }, updateChildAddonDto);
    return this.findChildAddonById(packageId, slotId);
  }

  async removeChildAddon(packageId: number, slotId: number): Promise<void> {
    const result = await this.childAddonRepository.delete({ packageId, slotId });
    if (result.affected === 0) {
      throw new NotFoundException(`Child addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
  }

  // =================== INFANT ADDON METHODS ===================
  async createInfantAddon(createInfantAddonDto: CreateInfantAddonDto): Promise<InfantAddon> {
    const addon = this.infantAddonRepository.create(createInfantAddonDto);
    return this.infantAddonRepository.save(addon);
  }

  async findAllInfantAddons(): Promise<InfantAddon[]> {
    return this.infantAddonRepository.find({
      relations: ['package', 'slot']
    });
  }

  async findInfantAddonById(packageId: number, slotId: number): Promise<InfantAddon | null> {
    return this.infantAddonRepository.findOne({
      where: { packageId, slotId },
      relations: ['package', 'slot']
    });
  }

  async updateInfantAddon(
    packageId: number,
    slotId: number,
    updateInfantAddonDto: UpdateInfantAddonDto
  ): Promise<InfantAddon | null> {
    await this.infantAddonRepository.update({ packageId, slotId }, updateInfantAddonDto);
    return this.findInfantAddonById(packageId, slotId);
  }

  async removeInfantAddon(packageId: number, slotId: number): Promise<void> {
    const result = await this.infantAddonRepository.delete({ packageId, slotId });
    if (result.affected === 0) {
      throw new NotFoundException(`Infant addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
  }

  // =================== COMBINED PRICING METHOD ===================
  async getPackagePricing(packageId: number, slotId: number): Promise<PackagePricingResponseDto | null> {
    // First, check if the package and slot exist
    const packageEntity = await this.packageRepository.findOne({ where: { id: packageId } });
    const slotEntity = await this.slotRepository.findOne({ where: { id: slotId } });

    if (!packageEntity || !slotEntity) {
      throw new NotFoundException(
        `Package with ID ${packageId} ${!packageEntity ? 'not found' : ''} ${!packageEntity && !slotEntity ? 'and' : ''} Slot with ID ${slotId} ${!slotEntity ? 'not found' : ''}`
      );
    }

    // Get package fare
    const packageFare = await this.packageFareRepository.findOne({
      where: { packageId, slotId }
    });

    if (!packageFare) {
      throw new NotFoundException(`No fare found for Package ID ${packageId} and Slot ID ${slotId}`);
    }

    // Get all installments
    const [adultInstallment, childInstallment, infantInstallment] = await Promise.all([
      this.adultInstallmentRepository.findOne({ where: { packageId, slotId } }),
      this.childInstallmentRepository.findOne({ where: { packageId, slotId } }),
      this.infantInstallmentRepository.findOne({ where: { packageId, slotId } })
    ]);

    // Build response
    const response: PackagePricingResponseDto = {
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
}
