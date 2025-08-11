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
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
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

@Controller('packages')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN) // Only admins and super admins can manage packages
@UseInterceptors(ClassSerializerInterceptor)
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  // =================== PACKAGE ENDPOINTS ===================
  @Post()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async updatePackage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePackageDto: UpdatePackageDto,
  ) {
    const pkg = await this.packagesService.updatePackage(id, updatePackageDto);
    if (!pkg) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return pkg;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  removePackage(@Param('id', ParseIntPipe) id: number) {
    return this.packagesService.removePackage(id);
  }

  // =================== COMBINED PRICING ENDPOINT ===================
  @Get(':packageId/slots/:slotId/pricing')
  async getPackagePricing(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number,
  ): Promise<PackagePricingResponseDto | null> {
    return this.packagesService.getPackagePricing(packageId, slotId);
  }
}

@Controller('slots')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN) // Only admins and super admins can manage slots
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
    @Body() updateSlotDto: UpdateSlotDto,
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
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN) // Only admins and super admins can manage package fares
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
    @Param('slotId', ParseIntPipe) slotId: number,
  ) {
    const fare = await this.packagesService.findPackageFareById(
      packageId,
      slotId,
    );
    if (!fare) {
      throw new NotFoundException(
        `Package fare with Package ID ${packageId} and Slot ID ${slotId} not found`,
      );
    }
    return fare;
  }

  @Patch(':packageId/:slotId')
  async updatePackageFare(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number,
    @Body() updatePackageFareDto: UpdatePackageFareDto,
  ) {
    const fare = await this.packagesService.updatePackageFare(
      packageId,
      slotId,
      updatePackageFareDto,
    );
    if (!fare) {
      throw new NotFoundException(
        `Package fare with Package ID ${packageId} and Slot ID ${slotId} not found`,
      );
    }
    return fare;
  }

  @Delete(':packageId/:slotId')
  removePackageFare(
    @Param('packageId', ParseIntPipe) packageId: number,
    @Param('slotId', ParseIntPipe) slotId: number,
  ) {
    return this.packagesService.removePackageFare(packageId, slotId);
  }
}

@Controller('installment-plans')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN) // Only admins and super admins can manage installment plans
export class InstallmentPlansController {
  constructor(private readonly packagesService: PackagesService) {}

  // =================== INSTALLMENT PLAN ENDPOINTS ===================
  @Post()
  createInstallmentPlan(
    @Body() createInstallmentPlanDto: CreateInstallmentPlanDto,
  ) {
    return this.packagesService.createInstallmentPlan(createInstallmentPlanDto);
  }

  @Get()
  findAllInstallmentPlans() {
    return this.packagesService.findAllInstallmentPlans();
  }

  @Get(':id')
  async findInstallmentPlanById(@Param('id', ParseIntPipe) id: number) {
    const plan = await this.packagesService.findInstallmentPlanById(id);
    if (!plan) {
      throw new NotFoundException(`Installment plan with ID ${id} not found`);
    }
    return plan;
  }

  @Patch(':id')
  async updateInstallmentPlan(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInstallmentPlanDto: UpdateInstallmentPlanDto,
  ) {
    const plan = await this.packagesService.updateInstallmentPlan(
      id,
      updateInstallmentPlanDto,
    );
    if (!plan) {
      throw new NotFoundException(`Installment plan with ID ${id} not found`);
    }
    return plan;
  }

  @Delete(':id')
  removeInstallmentPlan(@Param('id', ParseIntPipe) id: number) {
    return this.packagesService.removeInstallmentPlan(id);
  }
}

@Controller('adult-installment-values')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN) // Only admins and super admins can manage adult installment values
export class AdultInstallmentValuesController {
  constructor(private readonly packagesService: PackagesService) {}

  // =================== ADULT INSTALLMENT VALUE ENDPOINTS ===================
  @Post()
  createAdultInstallmentValue(
    @Body() createAdultInstallmentValueDto: CreateAdultInstallmentValueDto,
  ) {
    return this.packagesService.createAdultInstallmentValue(
      createAdultInstallmentValueDto,
    );
  }

  @Get()
  findAllAdultInstallmentValues() {
    return this.packagesService.findAllAdultInstallmentValues();
  }

  @Get(':id')
  async findAdultInstallmentValueById(@Param('id', ParseIntPipe) id: number) {
    const value = await this.packagesService.findAdultInstallmentValueById(id);
    if (!value) {
      throw new NotFoundException(
        `Adult installment value with ID ${id} not found`,
      );
    }
    return value;
  }

  @Patch(':id')
  async updateAdultInstallmentValue(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdultInstallmentValueDto: UpdateAdultInstallmentValueDto,
  ) {
    const value = await this.packagesService.updateAdultInstallmentValue(
      id,
      updateAdultInstallmentValueDto,
    );
    if (!value) {
      throw new NotFoundException(
        `Adult installment value with ID ${id} not found`,
      );
    }
    return value;
  }

  @Delete(':id')
  removeAdultInstallmentValue(@Param('id', ParseIntPipe) id: number) {
    return this.packagesService.removeAdultInstallmentValue(id);
  }
}

@Controller('child-installment-values')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN) // Only admins and super admins can manage child installment values
export class ChildInstallmentValuesController {
  constructor(private readonly packagesService: PackagesService) {}

  // =================== CHILD INSTALLMENT VALUE ENDPOINTS ===================
  @Post()
  createChildInstallmentValue(
    @Body() createChildInstallmentValueDto: CreateChildInstallmentValueDto,
  ) {
    return this.packagesService.createChildInstallmentValue(
      createChildInstallmentValueDto,
    );
  }

  @Get()
  findAllChildInstallmentValues() {
    return this.packagesService.findAllChildInstallmentValues();
  }

  @Get(':id')
  async findChildInstallmentValueById(@Param('id', ParseIntPipe) id: number) {
    const value = await this.packagesService.findChildInstallmentValueById(id);
    if (!value) {
      throw new NotFoundException(
        `Child installment value with ID ${id} not found`,
      );
    }
    return value;
  }

  @Patch(':id')
  async updateChildInstallmentValue(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChildInstallmentValueDto: UpdateChildInstallmentValueDto,
  ) {
    const value = await this.packagesService.updateChildInstallmentValue(
      id,
      updateChildInstallmentValueDto,
    );
    if (!value) {
      throw new NotFoundException(
        `Child installment value with ID ${id} not found`,
      );
    }
    return value;
  }

  @Delete(':id')
  removeChildInstallmentValue(@Param('id', ParseIntPipe) id: number) {
    return this.packagesService.removeChildInstallmentValue(id);
  }
}

@Controller('infant-installment-values')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN) // Only admins and super admins can manage infant installment values
export class InfantInstallmentValuesController {
  constructor(private readonly packagesService: PackagesService) {}

  // =================== INFANT INSTALLMENT VALUE ENDPOINTS ===================
  @Post()
  createInfantInstallmentValue(
    @Body() createInfantInstallmentValueDto: CreateInfantInstallmentValueDto,
  ) {
    return this.packagesService.createInfantInstallmentValue(
      createInfantInstallmentValueDto,
    );
  }

  @Get()
  findAllInfantInstallmentValues() {
    return this.packagesService.findAllInfantInstallmentValues();
  }

  @Get(':id')
  async findInfantInstallmentValueById(@Param('id', ParseIntPipe) id: number) {
    const value = await this.packagesService.findInfantInstallmentValueById(id);
    if (!value) {
      throw new NotFoundException(
        `Infant installment value with ID ${id} not found`,
      );
    }
    return value;
  }

  @Patch(':id')
  async updateInfantInstallmentValue(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInfantInstallmentValueDto: UpdateInfantInstallmentValueDto,
  ) {
    const value = await this.packagesService.updateInfantInstallmentValue(
      id,
      updateInfantInstallmentValueDto,
    );
    if (!value) {
      throw new NotFoundException(
        `Infant installment value with ID ${id} not found`,
      );
    }
    return value;
  }

  @Delete(':id')
  removeInfantInstallmentValue(@Param('id', ParseIntPipe) id: number) {
    return this.packagesService.removeInfantInstallmentValue(id);
  }
}

@Controller('adult-addons')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN) // Only admins and super admins can manage adult addons
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

  @Get(':id')
  async findAdultAddonById(@Param('id', ParseIntPipe) id: number) {
    const addon = await this.packagesService.findAdultAddonById(id);
    if (!addon) {
      throw new NotFoundException(`Adult addon with ID ${id} not found`);
    }
    return addon;
  }

  @Patch(':id')
  async updateAdultAddon(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdultAddonDto: UpdateAdultAddonDto,
  ) {
    const addon = await this.packagesService.updateAdultAddon(
      id,
      updateAdultAddonDto,
    );
    if (!addon) {
      throw new NotFoundException(`Adult addon with ID ${id} not found`);
    }
    return addon;
  }

  @Delete(':id')
  removeAdultAddon(@Param('id', ParseIntPipe) id: number) {
    return this.packagesService.removeAdultAddon(id);
  }
}

@Controller('child-addons')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN) // Only admins and super admins can manage child addons
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

  @Get(':id')
  async findChildAddonById(@Param('id', ParseIntPipe) id: number) {
    const addon = await this.packagesService.findChildAddonById(id);
    if (!addon) {
      throw new NotFoundException(`Child addon with ID ${id} not found`);
    }
    return addon;
  }

  @Patch(':id')
  async updateChildAddon(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChildAddonDto: UpdateChildAddonDto,
  ) {
    const addon = await this.packagesService.updateChildAddon(
      id,
      updateChildAddonDto,
    );
    if (!addon) {
      throw new NotFoundException(`Child addon with ID ${id} not found`);
    }
    return addon;
  }

  @Delete(':id')
  removeChildAddon(@Param('id', ParseIntPipe) id: number) {
    return this.packagesService.removeChildAddon(id);
  }
}

@Controller('infant-addons')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN) // Only admins and super admins can manage infant addons
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

  @Get(':id')
  async findInfantAddonById(@Param('id', ParseIntPipe) id: number) {
    const addon = await this.packagesService.findInfantAddonById(id);
    if (!addon) {
      throw new NotFoundException(`Infant addon with ID ${id} not found`);
    }
    return addon;
  }

  @Patch(':id')
  async updateInfantAddon(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInfantAddonDto: UpdateInfantAddonDto,
  ) {
    const addon = await this.packagesService.updateInfantAddon(
      id,
      updateInfantAddonDto,
    );
    if (!addon) {
      throw new NotFoundException(`Infant addon with ID ${id} not found`);
    }
    return addon;
  }

  @Delete(':id')
  removeInfantAddon(@Param('id', ParseIntPipe) id: number) {
    return this.packagesService.removeInfantAddon(id);
  }
}
