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

// Installment DTOs (shared structure)
export interface CreateInstallmentDto {
  packageId: number;
  slotId: number;
  firstInstallment: number;
  firstInstallmentDueDate: Date;
  secondInstallment: number;
  secondInstallmentDueDate: Date;
  thirdInstallment: number;
  thirdInstallmentDueDate: Date;
}

export interface UpdateInstallmentDto {
  firstInstallment?: number;
  firstInstallmentDueDate?: Date;
  secondInstallment?: number;
  secondInstallmentDueDate?: Date;
  thirdInstallment?: number;
  thirdInstallmentDueDate?: Date;
}

export type CreateAdultInstallmentDto = CreateInstallmentDto;
export type CreateChildInstallmentDto = CreateInstallmentDto;
export type CreateInfantInstallmentDto = CreateInstallmentDto;

export type UpdateAdultInstallmentDto = UpdateInstallmentDto;
export type UpdateChildInstallmentDto = UpdateInstallmentDto;
export type UpdateInfantInstallmentDto = UpdateInstallmentDto;

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
