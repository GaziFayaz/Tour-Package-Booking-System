import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Package,
  Slot,
  PackageFare,
  InstallmentPlan,
  AdultInstallmentValue,
  ChildInstallmentValue,
  InfantInstallmentValue,
  AdultAddon,
  ChildAddon,
  InfantAddon,
} from './entities';
import type {
  CreatePackageDto,
  UpdatePackageDto,
  CreateSlotDto,
  UpdateSlotDto,
  CreatePackageFareDto,
  UpdatePackageFareDto,
  CreateInstallmentPlanDto,
  UpdateInstallmentPlanDto,
  CreateAdultInstallmentValueDto,
  UpdateAdultInstallmentValueDto,
  CreateChildInstallmentValueDto,
  UpdateChildInstallmentValueDto,
  CreateInfantInstallmentValueDto,
  UpdateInfantInstallmentValueDto,
  CreateAdultAddonDto,
  UpdateAdultAddonDto,
  CreateChildAddonDto,
  UpdateChildAddonDto,
  CreateInfantAddonDto,
  UpdateInfantAddonDto,
  PackagePricingResponseDto,
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
    @InjectRepository(InstallmentPlan)
    private readonly installmentPlanRepository: Repository<InstallmentPlan>,
    @InjectRepository(AdultInstallmentValue)
    private readonly adultInstallmentValueRepository: Repository<AdultInstallmentValue>,
    @InjectRepository(ChildInstallmentValue)
    private readonly childInstallmentValueRepository: Repository<ChildInstallmentValue>,
    @InjectRepository(InfantInstallmentValue)
    private readonly infantInstallmentValueRepository: Repository<InfantInstallmentValue>,
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
      relations: ['fares', 'adultAddons', 'childAddons', 'infantAddons'],
    });
  }

  async findPackageById(id: number): Promise<Package | null> {
    return this.packageRepository.findOne({
      where: { id },
      relations: ['fares', 'adultAddons', 'childAddons', 'infantAddons'],
    });
  }

  async updatePackage(
    id: number,
    updatePackageDto: UpdatePackageDto,
  ): Promise<Package | null> {
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
      relations: ['fares', 'adultAddons', 'childAddons', 'infantAddons'],
    });
  }

  async findSlotById(id: number): Promise<Slot | null> {
    return this.slotRepository.findOne({
      where: { id },
      relations: ['fares', 'adultAddons', 'childAddons', 'infantAddons'],
    });
  }

  async updateSlot(
    id: number,
    updateSlotDto: UpdateSlotDto,
  ): Promise<Slot | null> {
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
  async createPackageFare(
    createPackageFareDto: CreatePackageFareDto,
  ): Promise<PackageFare> {
    const packageFare = this.packageFareRepository.create(createPackageFareDto);
    return this.packageFareRepository.save(packageFare);
  }

  async findAllPackageFares(): Promise<PackageFare[]> {
    return this.packageFareRepository.find({
      relations: ['package', 'slot', 'installmentPlan'],
    });
  }

  async findPackageFareById(
    packageId: number,
    slotId: number,
  ): Promise<PackageFare | null> {
    return this.packageFareRepository.findOne({
      where: { packageId, slotId },
      relations: ['package', 'slot', 'installmentPlan'],
    });
  }

  async updatePackageFare(
    packageId: number,
    slotId: number,
    updatePackageFareDto: UpdatePackageFareDto,
  ): Promise<PackageFare | null> {
    await this.packageFareRepository.update(
      { packageId, slotId },
      updatePackageFareDto,
    );
    return this.findPackageFareById(packageId, slotId);
  }

  async removePackageFare(packageId: number, slotId: number): Promise<void> {
    const result = await this.packageFareRepository.delete({
      packageId,
      slotId,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Package fare with Package ID ${packageId} and Slot ID ${slotId} not found`,
      );
    }
  }

  // =================== INSTALLMENT PLAN METHODS ===================
  async createInstallmentPlan(
    createInstallmentPlanDto: CreateInstallmentPlanDto,
  ): Promise<InstallmentPlan> {
    const plan = this.installmentPlanRepository.create(
      createInstallmentPlanDto,
    );
    return this.installmentPlanRepository.save(plan);
  }

  async findAllInstallmentPlans(): Promise<InstallmentPlan[]> {
    return this.installmentPlanRepository.find({
      relations: ['fare', 'adultValues', 'childValues', 'infantValues'],
    });
  }

  async findInstallmentPlanById(id: number): Promise<InstallmentPlan | null> {
    return this.installmentPlanRepository.findOne({
      where: { id },
      relations: ['fare', 'adultValues', 'childValues', 'infantValues'],
    });
  }

  async findInstallmentPlanByPackageFare(
    packageId: number,
    slotId: number,
  ): Promise<InstallmentPlan | null> {
    return this.installmentPlanRepository.findOne({
      where: { packageId, slotId },
      relations: ['fare', 'adultValues', 'childValues', 'infantValues'],
    });
  }

  async updateInstallmentPlan(
    id: number,
    updateInstallmentPlanDto: UpdateInstallmentPlanDto,
  ): Promise<InstallmentPlan | null> {
    await this.installmentPlanRepository.update(id, updateInstallmentPlanDto);
    return this.findInstallmentPlanById(id);
  }

  async removeInstallmentPlan(id: number): Promise<void> {
    const result = await this.installmentPlanRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Installment plan with ID ${id} not found`);
    }
  }

  // =================== ADULT INSTALLMENT VALUE METHODS ===================
  async createAdultInstallmentValue(
    createAdultInstallmentValueDto: CreateAdultInstallmentValueDto,
  ): Promise<AdultInstallmentValue> {
    const value = this.adultInstallmentValueRepository.create(
      createAdultInstallmentValueDto,
    );
    return this.adultInstallmentValueRepository.save(value);
  }

  async findAllAdultInstallmentValues(): Promise<AdultInstallmentValue[]> {
    return this.adultInstallmentValueRepository.find({
      relations: ['installmentPlan'],
    });
  }

  async findAdultInstallmentValueById(
    id: number,
  ): Promise<AdultInstallmentValue | null> {
    return this.adultInstallmentValueRepository.findOne({
      where: { id },
      relations: ['installmentPlan'],
    });
  }

  async updateAdultInstallmentValue(
    id: number,
    updateAdultInstallmentValueDto: UpdateAdultInstallmentValueDto,
  ): Promise<AdultInstallmentValue | null> {
    await this.adultInstallmentValueRepository.update(
      id,
      updateAdultInstallmentValueDto,
    );
    return this.findAdultInstallmentValueById(id);
  }

  async removeAdultInstallmentValue(id: number): Promise<void> {
    const result = await this.adultInstallmentValueRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Adult installment value with ID ${id} not found`,
      );
    }
  }

  // =================== CHILD INSTALLMENT VALUE METHODS ===================
  async createChildInstallmentValue(
    createChildInstallmentValueDto: CreateChildInstallmentValueDto,
  ): Promise<ChildInstallmentValue> {
    const value = this.childInstallmentValueRepository.create(
      createChildInstallmentValueDto,
    );
    return this.childInstallmentValueRepository.save(value);
  }

  async findAllChildInstallmentValues(): Promise<ChildInstallmentValue[]> {
    return this.childInstallmentValueRepository.find({
      relations: ['installmentPlan'],
    });
  }

  async findChildInstallmentValueById(
    id: number,
  ): Promise<ChildInstallmentValue | null> {
    return this.childInstallmentValueRepository.findOne({
      where: { id },
      relations: ['installmentPlan'],
    });
  }

  async updateChildInstallmentValue(
    id: number,
    updateChildInstallmentValueDto: UpdateChildInstallmentValueDto,
  ): Promise<ChildInstallmentValue | null> {
    await this.childInstallmentValueRepository.update(
      id,
      updateChildInstallmentValueDto,
    );
    return this.findChildInstallmentValueById(id);
  }

  async removeChildInstallmentValue(id: number): Promise<void> {
    const result = await this.childInstallmentValueRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Child installment value with ID ${id} not found`,
      );
    }
  }

  // =================== INFANT INSTALLMENT VALUE METHODS ===================
  async createInfantInstallmentValue(
    createInfantInstallmentValueDto: CreateInfantInstallmentValueDto,
  ): Promise<InfantInstallmentValue> {
    const value = this.infantInstallmentValueRepository.create(
      createInfantInstallmentValueDto,
    );
    return this.infantInstallmentValueRepository.save(value);
  }

  async findAllInfantInstallmentValues(): Promise<InfantInstallmentValue[]> {
    return this.infantInstallmentValueRepository.find({
      relations: ['installmentPlan'],
    });
  }

  async findInfantInstallmentValueById(
    id: number,
  ): Promise<InfantInstallmentValue | null> {
    return this.infantInstallmentValueRepository.findOne({
      where: { id },
      relations: ['installmentPlan'],
    });
  }

  async updateInfantInstallmentValue(
    id: number,
    updateInfantInstallmentValueDto: UpdateInfantInstallmentValueDto,
  ): Promise<InfantInstallmentValue | null> {
    await this.infantInstallmentValueRepository.update(
      id,
      updateInfantInstallmentValueDto,
    );
    return this.findInfantInstallmentValueById(id);
  }

  async removeInfantInstallmentValue(id: number): Promise<void> {
    const result = await this.infantInstallmentValueRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Infant installment value with ID ${id} not found`,
      );
    }
  }

  // =================== ADULT ADDON METHODS ===================
  async createAdultAddon(
    createAdultAddonDto: CreateAdultAddonDto,
  ): Promise<AdultAddon> {
    const addon = this.adultAddonRepository.create(createAdultAddonDto);
    return this.adultAddonRepository.save(addon);
  }

  async findAllAdultAddons(): Promise<AdultAddon[]> {
    return this.adultAddonRepository.find({
      relations: ['package', 'slot'],
    });
  }

  async findAdultAddonById(id: number): Promise<AdultAddon | null> {
    return this.adultAddonRepository.findOne({
      where: { id },
      relations: ['package', 'slot'],
    });
  }

  async findAdultAddonsByPackageSlot(
    packageId: number,
    slotId: number,
  ): Promise<AdultAddon[]> {
    return this.adultAddonRepository.find({
      where: { packageId, slotId },
      relations: ['package', 'slot'],
    });
  }

  async updateAdultAddon(
    id: number,
    updateAdultAddonDto: UpdateAdultAddonDto,
  ): Promise<AdultAddon | null> {
    await this.adultAddonRepository.update(id, updateAdultAddonDto);
    return this.findAdultAddonById(id);
  }

  async removeAdultAddon(id: number): Promise<void> {
    const result = await this.adultAddonRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Adult addon with ID ${id} not found`);
    }
  }

  // =================== CHILD ADDON METHODS ===================
  async createChildAddon(
    createChildAddonDto: CreateChildAddonDto,
  ): Promise<ChildAddon> {
    const addon = this.childAddonRepository.create(createChildAddonDto);
    return this.childAddonRepository.save(addon);
  }

  async findAllChildAddons(): Promise<ChildAddon[]> {
    return this.childAddonRepository.find({
      relations: ['package', 'slot'],
    });
  }

  async findChildAddonById(id: number): Promise<ChildAddon | null> {
    return this.childAddonRepository.findOne({
      where: { id },
      relations: ['package', 'slot'],
    });
  }

  async findChildAddonsByPackageSlot(
    packageId: number,
    slotId: number,
  ): Promise<ChildAddon[]> {
    return this.childAddonRepository.find({
      where: { packageId, slotId },
      relations: ['package', 'slot'],
    });
  }

  async updateChildAddon(
    id: number,
    updateChildAddonDto: UpdateChildAddonDto,
  ): Promise<ChildAddon | null> {
    await this.childAddonRepository.update(id, updateChildAddonDto);
    return this.findChildAddonById(id);
  }

  async removeChildAddon(id: number): Promise<void> {
    const result = await this.childAddonRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Child addon with ID ${id} not found`);
    }
  }

  // =================== INFANT ADDON METHODS ===================
  async createInfantAddon(
    createInfantAddonDto: CreateInfantAddonDto,
  ): Promise<InfantAddon> {
    const addon = this.infantAddonRepository.create(createInfantAddonDto);
    return this.infantAddonRepository.save(addon);
  }

  async findAllInfantAddons(): Promise<InfantAddon[]> {
    return this.infantAddonRepository.find({
      relations: ['package', 'slot'],
    });
  }

  async findInfantAddonById(id: number): Promise<InfantAddon | null> {
    return this.infantAddonRepository.findOne({
      where: { id },
      relations: ['package', 'slot'],
    });
  }

  async findInfantAddonsByPackageSlot(
    packageId: number,
    slotId: number,
  ): Promise<InfantAddon[]> {
    return this.infantAddonRepository.find({
      where: { packageId, slotId },
      relations: ['package', 'slot'],
    });
  }

  async updateInfantAddon(
    id: number,
    updateInfantAddonDto: UpdateInfantAddonDto,
  ): Promise<InfantAddon | null> {
    await this.infantAddonRepository.update(id, updateInfantAddonDto);
    return this.findInfantAddonById(id);
  }

  async removeInfantAddon(id: number): Promise<void> {
    const result = await this.infantAddonRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Infant addon with ID ${id} not found`);
    }
  }

  // =================== COMBINED PRICING METHOD ===================
  async getPackagePricing(
    packageId: number,
    slotId: number,
  ): Promise<PackagePricingResponseDto | null> {
    // First, check if the package and slot exist
    const packageEntity = await this.packageRepository.findOne({
      where: { id: packageId },
    });
    const slotEntity = await this.slotRepository.findOne({
      where: { id: slotId },
    });

    if (!packageEntity || !slotEntity) {
      throw new NotFoundException(
        `Package with ID ${packageId} ${!packageEntity ? 'not found' : ''} ${!packageEntity && !slotEntity ? 'and' : ''} Slot with ID ${slotId} ${!slotEntity ? 'not found' : ''}`,
      );
    }

    // Get package fare with installment plan
    const packageFare = await this.packageFareRepository.findOne({
      where: { packageId, slotId },
      relations: ['installmentPlan'],
    });

    if (!packageFare) {
      throw new NotFoundException(
        `No fare found for Package ID ${packageId} and Slot ID ${slotId}`,
      );
    }

    let installmentData: {
      adult: {
        firstInstallment: number;
        firstInstallmentDueDate: Date;
        secondInstallment: number;
        secondInstallmentDueDate: Date;
        thirdInstallment: number;
        thirdInstallmentDueDate: Date;
        totalAmount: number;
      } | null;
      child: {
        firstInstallment: number;
        firstInstallmentDueDate: Date;
        secondInstallment: number;
        secondInstallmentDueDate: Date;
        thirdInstallment: number;
        thirdInstallmentDueDate: Date;
        totalAmount: number;
      } | null;
      infant: {
        firstInstallment: number;
        firstInstallmentDueDate: Date;
        secondInstallment: number;
        secondInstallmentDueDate: Date;
        thirdInstallment: number;
        thirdInstallmentDueDate: Date;
        totalAmount: number;
      } | null;
    } = {
      adult: null,
      child: null,
      infant: null,
    };

    // If installment plan exists, get the installment values and calculate due dates
    if (packageFare.installmentPlan) {
      const [adultValue, childValue, infantValue] = await Promise.all([
        this.adultInstallmentValueRepository.findOne({
          where: { installmentPlanId: packageFare.installmentPlan.id },
          relations: ['installmentPlan'],
        }),
        this.childInstallmentValueRepository.findOne({
          where: { installmentPlanId: packageFare.installmentPlan.id },
          relations: ['installmentPlan'],
        }),
        this.infantInstallmentValueRepository.findOne({
          where: { installmentPlanId: packageFare.installmentPlan.id },
          relations: ['installmentPlan'],
        }),
      ]);

      const baseDate = new Date(); // Use current date as booking date for calculation

      if (adultValue) {
        installmentData.adult = {
          firstInstallment: Number(adultValue.firstInstallmentAmount),
          firstInstallmentDueDate: new Date(
            baseDate.getTime() +
              packageFare.installmentPlan.firstInstallmentDays *
                24 *
                60 *
                60 *
                1000,
          ),
          secondInstallment: Number(adultValue.secondInstallmentAmount),
          secondInstallmentDueDate: new Date(
            baseDate.getTime() +
              packageFare.installmentPlan.secondInstallmentDays *
                24 *
                60 *
                60 *
                1000,
          ),
          thirdInstallment: Number(adultValue.thirdInstallmentAmount),
          thirdInstallmentDueDate: new Date(
            baseDate.getTime() +
              packageFare.installmentPlan.thirdInstallmentDays *
                24 *
                60 *
                60 *
                1000,
          ),
          totalAmount:
            Number(adultValue.firstInstallmentAmount) +
            Number(adultValue.secondInstallmentAmount) +
            Number(adultValue.thirdInstallmentAmount),
        };
      }

      if (childValue) {
        installmentData.child = {
          firstInstallment: Number(childValue.firstInstallmentAmount),
          firstInstallmentDueDate: new Date(
            baseDate.getTime() +
              packageFare.installmentPlan.firstInstallmentDays *
                24 *
                60 *
                60 *
                1000,
          ),
          secondInstallment: Number(childValue.secondInstallmentAmount),
          secondInstallmentDueDate: new Date(
            baseDate.getTime() +
              packageFare.installmentPlan.secondInstallmentDays *
                24 *
                60 *
                60 *
                1000,
          ),
          thirdInstallment: Number(childValue.thirdInstallmentAmount),
          thirdInstallmentDueDate: new Date(
            baseDate.getTime() +
              packageFare.installmentPlan.thirdInstallmentDays *
                24 *
                60 *
                60 *
                1000,
          ),
          totalAmount:
            Number(childValue.firstInstallmentAmount) +
            Number(childValue.secondInstallmentAmount) +
            Number(childValue.thirdInstallmentAmount),
        };
      }

      if (infantValue) {
        installmentData.infant = {
          firstInstallment: Number(infantValue.firstInstallmentAmount),
          firstInstallmentDueDate: new Date(
            baseDate.getTime() +
              packageFare.installmentPlan.firstInstallmentDays *
                24 *
                60 *
                60 *
                1000,
          ),
          secondInstallment: Number(infantValue.secondInstallmentAmount),
          secondInstallmentDueDate: new Date(
            baseDate.getTime() +
              packageFare.installmentPlan.secondInstallmentDays *
                24 *
                60 *
                60 *
                1000,
          ),
          thirdInstallment: Number(infantValue.thirdInstallmentAmount),
          thirdInstallmentDueDate: new Date(
            baseDate.getTime() +
              packageFare.installmentPlan.thirdInstallmentDays *
                24 *
                60 *
                60 *
                1000,
          ),
          totalAmount:
            Number(infantValue.firstInstallmentAmount) +
            Number(infantValue.secondInstallmentAmount) +
            Number(infantValue.thirdInstallmentAmount),
        };
      }
    }

    // Build response
    const response: PackagePricingResponseDto = {
      packageId,
      slotId,
      packageName: packageEntity.name,
      slotName: slotEntity.name,
      fares: {
        adult: Number(packageFare.adultFare),
        child: Number(packageFare.childFare),
        infant: Number(packageFare.infantFare),
      },
      installments: installmentData,
      createdAt: packageFare.createdAt,
      updatedAt: packageFare.updatedAt,
    };

    return response;
  }
}
