// Package DTOs
export interface CreatePackageDto {
  name: string;
}

export interface UpdatePackageDto {
  name?: string;
}

// Slot DTOs
export interface CreateSlotDto {
  name: string;
  seatCount: number;
  startDate: Date;
  endDate: Date;
}

export interface UpdateSlotDto {
  name?: string;
  seatCount?: number;
  startDate?: Date;
  endDate?: Date;
}

// Package Fare DTOs
export interface CreatePackageFareDto {
  packageId: number;
  slotId: number;
  adultFare: number;
  childFare: number;
  infantFare: number;
}

export interface UpdatePackageFareDto {
  adultFare?: number;
  childFare?: number;
  infantFare?: number;
}

// Installment Plan DTOs
export interface CreateInstallmentPlanDto {
  packageId: number;
  slotId: number;
  firstInstallmentDays: number;
  secondInstallmentDays: number;
  thirdInstallmentDays: number;
}

export interface UpdateInstallmentPlanDto {
  firstInstallmentDays?: number;
  secondInstallmentDays?: number;
  thirdInstallmentDays?: number;
}

// Installment Value DTOs
export interface CreateAdultInstallmentValueDto {
  installmentPlanId: number;
  firstInstallmentAmount: number;
  secondInstallmentAmount: number;
  thirdInstallmentAmount: number;
}

export interface UpdateAdultInstallmentValueDto {
  firstInstallmentAmount?: number;
  secondInstallmentAmount?: number;
  thirdInstallmentAmount?: number;
}

export interface CreateChildInstallmentValueDto {
  installmentPlanId: number;
  firstInstallmentAmount: number;
  secondInstallmentAmount: number;
  thirdInstallmentAmount: number;
}

export interface UpdateChildInstallmentValueDto {
  firstInstallmentAmount?: number;
  secondInstallmentAmount?: number;
  thirdInstallmentAmount?: number;
}

export interface CreateInfantInstallmentValueDto {
  installmentPlanId: number;
  firstInstallmentAmount: number;
  secondInstallmentAmount: number;
  thirdInstallmentAmount: number;
}

export interface UpdateInfantInstallmentValueDto {
  firstInstallmentAmount?: number;
  secondInstallmentAmount?: number;
  thirdInstallmentAmount?: number;
}

// Addon DTOs (shared structure)
export interface CreateAddonDto {
  packageId: number;
  slotId: number;
  type: string;
  fare: number;
}

export interface UpdateAddonDto {
  type?: string;
  fare?: number;
}

export type CreateAdultAddonDto = CreateAddonDto;
export type CreateChildAddonDto = CreateAddonDto;
export type CreateInfantAddonDto = CreateAddonDto;

export type UpdateAdultAddonDto = UpdateAddonDto;
export type UpdateChildAddonDto = UpdateAddonDto;
export type UpdateInfantAddonDto = UpdateAddonDto;

// Package Pricing Response DTO
export interface PackagePricingResponseDto {
  packageId: number;
  slotId: number;
  packageName: string;
  slotName: string;
  fares: {
    adult: number;
    child: number;
    infant: number;
  };
  installments: {
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
  };
  createdAt: Date;
  updatedAt: Date;
}
