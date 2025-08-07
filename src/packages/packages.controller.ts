import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
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

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  // =================== PACKAGE ENDPOINTS ===================
  @Post()
  createPackage(@Body() createPackageDto: CreatePackageDto) {
    return this.packagesService.createPackage(createPackageDto);
  }

  @Get()
  findAllPackages() {
    return this.packagesService.findAllPackages();
  }

  @Get(':id')
  async findPackageById(@Param('id', ParseIntPipe) id: number) {
    const pkg = await this.packagesService.findPackageById(id);
    if (!pkg) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return pkg;
  }

  @Patch(':id')
  async updatePackage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePackageDto: UpdatePackageDto
  ) {
    const pkg = await this.packagesService.updatePackage(id, updatePackageDto);
    if (!pkg) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return pkg;
  }

  @Delete(':id')
  removePackage(@Param('id', ParseIntPipe) id: number) {
    return this.packagesService.removePackage(id);
  }

  // =================== COMBINED PRICING ENDPOINT ===================
  @Get(':packageId/slots/:slotId/pricing')
  async getPackagePricing(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ): Promise<PackagePricingResponseDto | null> {
    return this.packagesService.getPackagePricing(packageId, slotId);
  }
}

@Controller('slots')
export class SlotsController {
  constructor(private readonly packagesService: PackagesService) {}

  // =================== SLOT ENDPOINTS ===================
  @Post()
  createSlot(@Body() createSlotDto: CreateSlotDto) {
    return this.packagesService.createSlot(createSlotDto);
  }

  @Get()
  findAllSlots() {
    return this.packagesService.findAllSlots();
  }

  @Get(':id')
  async findSlotById(@Param('id', ParseIntPipe) id: number) {
    const slot = await this.packagesService.findSlotById(id);
    if (!slot) {
      throw new NotFoundException(`Slot with ID ${id} not found`);
    }
    return slot;
  }

  @Patch(':id')
  async updateSlot(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSlotDto: UpdateSlotDto
  ) {
    const slot = await this.packagesService.updateSlot(id, updateSlotDto);
    if (!slot) {
      throw new NotFoundException(`Slot with ID ${id} not found`);
    }
    return slot;
  }

  @Delete(':id')
  removeSlot(@Param('id', ParseIntPipe) id: number) {
    return this.packagesService.removeSlot(id);
  }
}

@Controller('package-fares')
export class PackageFaresController {
  constructor(private readonly packagesService: PackagesService) {}

  // =================== PACKAGE FARE ENDPOINTS ===================
  @Post()
  createPackageFare(@Body() createPackageFareDto: CreatePackageFareDto) {
    return this.packagesService.createPackageFare(createPackageFareDto);
  }

  @Get()
  findAllPackageFares() {
    return this.packagesService.findAllPackageFares();
  }

  @Get(':packageId/:slotId')
  async findPackageFareById(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ) {
    const fare = await this.packagesService.findPackageFareById(packageId, slotId);
    if (!fare) {
      throw new NotFoundException(`Package fare with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
    return fare;
  }

  @Patch(':packageId/:slotId')
  async updatePackageFare(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number,
    @Body() updatePackageFareDto: UpdatePackageFareDto
  ) {
    const fare = await this.packagesService.updatePackageFare(packageId, slotId, updatePackageFareDto);
    if (!fare) {
      throw new NotFoundException(`Package fare with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
    return fare;
  }

  @Delete(':packageId/:slotId')
  removePackageFare(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ) {
    return this.packagesService.removePackageFare(packageId, slotId);
  }
}

@Controller('adult-installments')
export class AdultInstallmentsController {
  constructor(private readonly packagesService: PackagesService) {}

  // =================== ADULT INSTALLMENT ENDPOINTS ===================
  @Post()
  createAdultInstallment(@Body() createAdultInstallmentDto: CreateAdultInstallmentDto) {
    return this.packagesService.createAdultInstallment(createAdultInstallmentDto);
  }

  @Get()
  findAllAdultInstallments() {
    return this.packagesService.findAllAdultInstallments();
  }

  @Get(':packageId/:slotId')
  async findAdultInstallmentById(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ) {
    const installment = await this.packagesService.findAdultInstallmentById(packageId, slotId);
    if (!installment) {
      throw new NotFoundException(`Adult installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
    return installment;
  }

  @Patch(':packageId/:slotId')
  async updateAdultInstallment(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number,
    @Body() updateAdultInstallmentDto: UpdateAdultInstallmentDto
  ) {
    const installment = await this.packagesService.updateAdultInstallment(packageId, slotId, updateAdultInstallmentDto);
    if (!installment) {
      throw new NotFoundException(`Adult installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
    return installment;
  }

  @Delete(':packageId/:slotId')
  removeAdultInstallment(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ) {
    return this.packagesService.removeAdultInstallment(packageId, slotId);
  }
}

@Controller('child-installments')
export class ChildInstallmentsController {
  constructor(private readonly packagesService: PackagesService) {}

  // =================== CHILD INSTALLMENT ENDPOINTS ===================
  @Post()
  createChildInstallment(@Body() createChildInstallmentDto: CreateChildInstallmentDto) {
    return this.packagesService.createChildInstallment(createChildInstallmentDto);
  }

  @Get()
  findAllChildInstallments() {
    return this.packagesService.findAllChildInstallments();
  }

  @Get(':packageId/:slotId')
  async findChildInstallmentById(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ) {
    const installment = await this.packagesService.findChildInstallmentById(packageId, slotId);
    if (!installment) {
      throw new NotFoundException(`Child installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
    return installment;
  }

  @Patch(':packageId/:slotId')
  async updateChildInstallment(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number,
    @Body() updateChildInstallmentDto: UpdateChildInstallmentDto
  ) {
    const installment = await this.packagesService.updateChildInstallment(packageId, slotId, updateChildInstallmentDto);
    if (!installment) {
      throw new NotFoundException(`Child installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
    return installment;
  }

  @Delete(':packageId/:slotId')
  removeChildInstallment(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ) {
    return this.packagesService.removeChildInstallment(packageId, slotId);
  }
}

@Controller('infant-installments')
export class InfantInstallmentsController {
  constructor(private readonly packagesService: PackagesService) {}

  // =================== INFANT INSTALLMENT ENDPOINTS ===================
  @Post()
  createInfantInstallment(@Body() createInfantInstallmentDto: CreateInfantInstallmentDto) {
    return this.packagesService.createInfantInstallment(createInfantInstallmentDto);
  }

  @Get()
  findAllInfantInstallments() {
    return this.packagesService.findAllInfantInstallments();
  }

  @Get(':packageId/:slotId')
  async findInfantInstallmentById(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ) {
    const installment = await this.packagesService.findInfantInstallmentById(packageId, slotId);
    if (!installment) {
      throw new NotFoundException(`Infant installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
    return installment;
  }

  @Patch(':packageId/:slotId')
  async updateInfantInstallment(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number,
    @Body() updateInfantInstallmentDto: UpdateInfantInstallmentDto
  ) {
    const installment = await this.packagesService.updateInfantInstallment(packageId, slotId, updateInfantInstallmentDto);
    if (!installment) {
      throw new NotFoundException(`Infant installment with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
    return installment;
  }

  @Delete(':packageId/:slotId')
  removeInfantInstallment(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ) {
    return this.packagesService.removeInfantInstallment(packageId, slotId);
  }
}

@Controller('adult-addons')
export class AdultAddonsController {
  constructor(private readonly packagesService: PackagesService) {}

  // =================== ADULT ADDON ENDPOINTS ===================
  @Post()
  createAdultAddon(@Body() createAdultAddonDto: CreateAdultAddonDto) {
    return this.packagesService.createAdultAddon(createAdultAddonDto);
  }

  @Get()
  findAllAdultAddons() {
    return this.packagesService.findAllAdultAddons();
  }

  @Get(':packageId/:slotId')
  async findAdultAddonById(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ) {
    const addon = await this.packagesService.findAdultAddonById(packageId, slotId);
    if (!addon) {
      throw new NotFoundException(`Adult addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
    return addon;
  }

  @Patch(':packageId/:slotId')
  async updateAdultAddon(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number,
    @Body() updateAdultAddonDto: UpdateAdultAddonDto
  ) {
    const addon = await this.packagesService.updateAdultAddon(packageId, slotId, updateAdultAddonDto);
    if (!addon) {
      throw new NotFoundException(`Adult addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
    return addon;
  }

  @Delete(':packageId/:slotId')
  removeAdultAddon(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ) {
    return this.packagesService.removeAdultAddon(packageId, slotId);
  }
}

@Controller('child-addons')
export class ChildAddonsController {
  constructor(private readonly packagesService: PackagesService) {}

  // =================== CHILD ADDON ENDPOINTS ===================
  @Post()
  createChildAddon(@Body() createChildAddonDto: CreateChildAddonDto) {
    return this.packagesService.createChildAddon(createChildAddonDto);
  }

  @Get()
  findAllChildAddons() {
    return this.packagesService.findAllChildAddons();
  }

  @Get(':packageId/:slotId')
  async findChildAddonById(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ) {
    const addon = await this.packagesService.findChildAddonById(packageId, slotId);
    if (!addon) {
      throw new NotFoundException(`Child addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
    return addon;
  }

  @Patch(':packageId/:slotId')
  async updateChildAddon(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number,
    @Body() updateChildAddonDto: UpdateChildAddonDto
  ) {
    const addon = await this.packagesService.updateChildAddon(packageId, slotId, updateChildAddonDto);
    if (!addon) {
      throw new NotFoundException(`Child addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
    return addon;
  }

  @Delete(':packageId/:slotId')
  removeChildAddon(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ) {
    return this.packagesService.removeChildAddon(packageId, slotId);
  }
}

@Controller('infant-addons')
export class InfantAddonsController {
  constructor(private readonly packagesService: PackagesService) {}

  // =================== INFANT ADDON ENDPOINTS ===================
  @Post()
  createInfantAddon(@Body() createInfantAddonDto: CreateInfantAddonDto) {
    return this.packagesService.createInfantAddon(createInfantAddonDto);
  }

  @Get()
  findAllInfantAddons() {
    return this.packagesService.findAllInfantAddons();
  }

  @Get(':packageId/:slotId')
  async findInfantAddonById(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ) {
    const addon = await this.packagesService.findInfantAddonById(packageId, slotId);
    if (!addon) {
      throw new NotFoundException(`Infant addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
    return addon;
  }

  @Patch(':packageId/:slotId')
  async updateInfantAddon(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number,
    @Body() updateInfantAddonDto: UpdateInfantAddonDto
  ) {
    const addon = await this.packagesService.updateInfantAddon(packageId, slotId, updateInfantAddonDto);
    if (!addon) {
      throw new NotFoundException(`Infant addon with Package ID ${packageId} and Slot ID ${slotId} not found`);
    }
    return addon;
  }

  @Delete(':packageId/:slotId')
  removeInfantAddon(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number
  ) {
    return this.packagesService.removeInfantAddon(packageId, slotId);
  }
}
